import { useLoaderData, Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { requireUserSession } from "../data/auth.server";
import Nav from "../layouts/Nav";
import updateUserName from "../data/dynamodb/user/updateUserName";

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
      <main className="flex-grow mt-2">
        <h1 className="text-4xl font-bold text-center">Mi perfil</h1>
        <Form method="post" className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleNameChange}
            value={name}
          />
          {actionData?.errors?.name ? (
            <em>{actionData?.errors?.name}</em>
          ) : null}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            disabled
          />
          <button type="submit" disabled={name === actionData?.newUser?.name}>
            Actualizar
          </button>
          {actionData?.isSuccess ? (
            <p className="text-green-600">Perfil actualizado correctamente</p>
          ) : null}
        </Form>
      </main>
    </div>
  );
}
