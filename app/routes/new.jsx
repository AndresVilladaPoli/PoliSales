import { useForm } from "react-hook-form";
import { useSubmit } from "@remix-run/react";
import { requireUserSession } from "../data/auth.server";
import Nav from "../layouts/Nav";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";

export function loader({ request }) {
  return requireUserSession(request);
}

export default function New() {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = (data) => {
    console.log(data);
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gray-100">
      <Nav />
      <main className="flex-grow mt-2">
        <Form onSubmit={handleSubmit(handleSubmitForm)}>
          <Input
            {...register("titulo", {
              required: true,
              minLength: 3,
              maxLength: 30,
            })}
            error={errors?.titulo}
            name="Titulo"
          />
          <Input
            {...register("content", {
              required: true,
              minLength: 10,
              maxLength: 250,
            })}
            error={errors?.content}
            name="Descripción"
          />
          <Input
            {...register("price", {
              required: true,
              min: 0,
            })}
            error={errors?.price}
            name="Precio"
            type="number"
          />
          <Button name="Publicar" type="submit" />
        </Form>
      </main>
    </div>
  );
}
