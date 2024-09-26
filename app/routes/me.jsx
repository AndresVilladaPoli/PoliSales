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
      <main className="flex-grow mt-6 px-4 sm:px-0">
        <h1 className="text-4xl font-bold text-center mb-6">Mi perfil</h1>
        <Form method="post" className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleNameChange}
              value={name}
            />
            {actionData?.errors?.name && (
              <em className="text-red-600 text-sm">{actionData.errors.name}</em>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
              value={user.email}
              disabled
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-300 disabled:bg-gray-400"
            disabled={name === actionData?.newUser?.name}
          >
            Actualizar
          </button>
          {actionData?.isSuccess && (
            <p className="text-green-600 mt-2">Perfil actualizado correctamente</p>
          )}
        </Form>
      </main>
    </div>
  );
}

