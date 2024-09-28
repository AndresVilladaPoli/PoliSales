import { useLoaderData, useActionData } from "@remix-run/react";
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
    <div className="h-screen flex flex-col items-center bg-gray-100">
      <Nav />
      <main className="flex-grow mt-6 px-4 sm:px-0">
        <h1 className="text-4xl font-bold text-center mb-6">Mi perfil</h1>
        <Form>
          <Input
            id="name"
            name="Nombre"
            type="text"
            value={name}
            onChange={handleNameChange}
            error={actionData?.errors?.name}
          />
          <Input
            id="email"
            name="Correo"
            type="email"
            value={user.email}
            disabled={true}
          />
          <Button
            name="Actualizar"
            type="submit"
            disabled={name === actionData?.newUser?.name}
          />
          {actionData?.isSuccess && (
            <p className="text-green-600 mt-2">
              Perfil actualizado correctamente
            </p>
          )}
        </Form>
      </main>
    </div>
  );
}
