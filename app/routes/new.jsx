import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useActionData, useSubmit } from "@remix-run/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { requireUserSession } from "../data/auth.server";
import Nav from "../layouts/Nav";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import Publication from "../models/Publication";
import createPublication from "../data/dynamodb/publications/createPublication";
import ImageUploader from "../components/ImageUploader";

export function loader({ request }) {
  return requireUserSession(request);
}

export async function action({ request }) {
  const user = await requireUserSession(request);
  const data = await request.json();

  const newPublication = new Publication({
    ...data,
    authorEmail: user.email,
  });

  try {
    await createPublication(newPublication);
  } catch (error) {
    return { isSuccess: false, error: error.message };
  }

  return { isSuccess: true };
}

const categories = [
  { value: Publication.CATEGORIA_INMUEBLE, label: "Inmueble" },
  { value: Publication.CATEGORIA_VEHICULO, label: "Vehículo" },
  { value: Publication.CATEGORIA_SERVICIOS, label: "Servicios" },
  { value: Publication.CATEGORIA_LIBROS, label: "Libros" },
  { value: Publication.CATEGORIA_PERSONALES, label: "Personales" },
  { value: Publication.CATEGORIA_MASCOTAS, label: "Mascotas" },
  { value: Publication.CATEGORIA_INSTITUCIONAL, label: "Institucional" },
];

const formSchema = z.object({
  category: z
    .string({
      required_error: "Debes seleccionar una categoría",
    })
    .refine(
      (value) => categories.some((category) => category.value === value),
      {
        message: "La categoría seleccionada no es válida",
      },
    ),
  title: z
    .string({
      required_error: "Debes ingresar un título",
    })
    .min(3, {
      message: "El título debe tener al menos 3 caracteres",
    })
    .max(30, {
      message: "El título debe tener como máximo 30 caracteres",
    }),
  content: z
    .string({
      required_error: "Debes ingresar una descripción",
    })
    .min(10, {
      message: "La descripción debe tener al menos 10 caracteres",
    })
    .max(250, {
      message: "La descripción debe tener como máximo 250 caracteres",
    }),
  price: z.coerce
    .number({
      required_error: "Debes ingresar un precio",
    })
    .min(1000, {
      message: "El precio mínimo es de $1.000 pesos",
    })
    .max(9999999, {
      message: "El valor no debe superar los $9.999.999 pesos",
    }),
});

const uploadFilesToS3 = async (files) => {
  const mimeTypes = files.map((file) => file.type);

  const urlsPromises = mimeTypes.map(async (mimeType) => {
    const response = await fetch(`/presignedUrl?mimeType=${mimeType}`);
    const data = await response.json();

    return data;
  });

  const presignedInfo = await Promise.all(urlsPromises);

  const filesUrls = presignedInfo.map(
    async ({ presignedUrl: { url, fields } }, index) => {
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append("file", files[index]);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          "Error uploading file",
          response.statusText,
          files[index],
        );
      }

      if (url.contains("localhost")) {
        return `${url}${fields.key}`;
      }

      return `https://${fields.bucket}.s3.amazonaws.com/${fields.key}`;
    },
  );

  const urls = await Promise.all(filesUrls);

  return urls;
};

export default function New() {
  const [files, setFiles] = useState([]);
  const submit = useSubmit();
  const actionData = useActionData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: 1000,
    },
  });

  useEffect(() => {
    if (actionData?.isSuccess) reset();
  }, [actionData]);

  const handleSubmitForm = (data) => {
    uploadFilesToS3(files).then((urls) => {
      submit(
        { ...data, images: urls },
        { method: "post", encType: "application/json" },
      );
    });
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#cedad3]">
      <Nav />
      <main className="flex-grow mt-8 w-full max-w-xl p-4 bg-white rounded-md shadow-lg">
        <h1 className="text-2xl font-bold text-[#1c6b44] mb-6 text-center">
          Crea una Nueva Publicación
        </h1>
        <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <Select
            {...register("category")}
            id="category"
            error={errors?.category?.message}
            options={categories}
            placeHolder="Selecciona una categoría"
            label="Categoría"
            className="mb-4 border border-[#1c6b44] rounded-md p-2"
          />
          <Input
            {...register("title", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
            id="title"
            label="Título"
            error={errors?.title?.message}
            type="text"
            className="mb-4 border border-[#1c6b44] rounded-md p-2"
          />
          <Input
            {...register("content", {
              required: true,
              minLength: 10,
              maxLength: 250,
            })}
            id="content"
            label="Descripción"
            error={errors?.content?.message}
            type="text"
            className="mb-4 border border-[#1c6b44] rounded-md p-2"
          />
          <Input
            type="number"
            {...register("price", { min: 50, valueAsNumber: true })}
            id="price"
            error={errors?.price?.message}
            label="Precio"
            className="mb-4 border border-[#1c6b44] rounded-md p-2"
          />
          <ImageUploader onUpload={setFiles} />
          <Button
            name="Publicar"
            type="submit"
            className="bg-[#1c6b44] text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          />
        </Form>
        {actionData?.isSuccess && (
          <p className="text-[#1c6b44] mt-4">
            Se ha creado la publicación correctamente
          </p>
        )}
        {!actionData?.isSuccess && (
          <p className="text-red-600 mt-4">{actionData?.error || ""}</p>
        )}
      </main>
    </div>
  );
}
