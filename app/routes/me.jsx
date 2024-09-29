import { useLoaderData, useActionData } from "@remix-run/react"; // act import
import { useState } from "react";
import { requireUserSession } from "../data/auth.server";
import Nav from "../layouts/Nav";
import updateUserName from "../data/dynamodb/user/updateUserName";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";

export async function loader({ request }) {
  const user = await requireUserSession(request);
  return { user };
}

export async function action({ request }) {
  const user = await requireUserSession(request);
  const formData = await request.formData();
  const name = String(formData.get("name")).trim();

  const errors = {};

  if (!name) {
    errors.name = "El nombre es requerido";
  } else if (name.length < 3) {
    errors.name = "El nombre debe tener al menos 3 caracteres";
  } else if (name.length > 50) {
    errors.name = "El nombre debe tener máximo 50 caracteres";
  } else if (name.toLowerCase().includes("admin")) {
    errors.name = "El nombre no puede ser admin";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, isSuccess: false };
  }

  const newUser = await updateUserName({ email: user.email, name });

  return { isSuccess: true, newUser };
}

export default function Me() {
  const { user } = useLoaderData();
  const actionData = useActionData();
  const [name, setName] = useState(user.name);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="h-screen flex flex-col items-center bg-[#cedad3]">
      <Nav />
      <main className="flex-grow mt-6 w-full max-w-lg px-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-[#1c6b44]">
          Mi perfil
        </h1>
        <Form className="bg-white shadow-md rounded-lg p-6 w-full">
          <div className="flex flex-col gap-4">
            <Input
              id="name"
              label="Nombre"
              name="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              error={actionData?.errors?.name}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            <Input
              id="email"
              name="email"
              label="Correo"
              type="email"
              defaultValue={user.email}
              disabled={true}
              className="p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button
              name="Actualizar"
              type="submit"
              disabled={name === actionData?.newUser?.name}
              className="bg-[#1c6b44] text-white hover:bg-[#024006] focus:ring-4 focus:ring-[#cedad3] transition-colors duration-300 w-full py-2 rounded-md"
            />
          </div>
          {actionData?.isSuccess && (
            <p className="text-green-600 mt-4 text-center">
              Perfil actualizado correctamente
            </p>
          )}
        </Form>
      </main>
    </div>
  );
}


