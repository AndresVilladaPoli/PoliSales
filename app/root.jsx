import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  Link,
  json,
} from "@remix-run/react";
import "./tailwind.css";

export const meta = () => {
  return [
    { title: "Poli Sales" },
    { name: "description", content: "Bienvenido a Poli Sales" },
  ];
};

export async function loader() {
  return json({
    ENV: {
      COGNITO_DOMAIN: process.env.COGNITO_DOMAIN,
      APP_CLIENT_ID: process.env.APP_CLIENT_ID,
      DOMAIN: process.env.DOMAIN,
    },
  });
}

export function Layout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// TODO: Se pierde estilos al recargar la página
// TODO: En rutas desconocidas redirigir a una pagina de no encontrado
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className=" text-2xl text-red-700">Ha ocurrido un error!</h1>
      <p className="my-3 text-base">{error.message}</p>
      <Link
        to="/"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
