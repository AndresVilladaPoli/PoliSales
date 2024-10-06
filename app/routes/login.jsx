import { useLoaderData, json } from "@remix-run/react";
import { jwtDecode } from "jwt-decode";
import { createUserSession } from "../data/auth.server";
import React from "react";

export async function loader({ request }) {
  const { COGNITO_DOMAIN, APP_CLIENT_ID, APP_CLIENT_SECRET, DOMAIN } =
    process.env;
  const frontEnv = {
    COGNITO_DOMAIN,
    APP_CLIENT_ID,
    DOMAIN,
  };

  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (code) {
    const response = await fetch(`${COGNITO_DOMAIN}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${APP_CLIENT_ID}:${APP_CLIENT_SECRET}`,
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: APP_CLIENT_ID,
        code,
        redirect_uri: `${DOMAIN}/login`,
      }),
    });

    const cognitoResponse = await response.json();

    if (!response.ok) {
      return json({
        ENV: frontEnv,
        error: `Error al obtener el token de Cognito: ${cognitoResponse.error}.`,
      });
    }

    const tokenClaim = jwtDecode(cognitoResponse.id_token);
    // TODO: Validar en todos los endpoints que el usuario tenga el correo institucional
    if (tokenClaim.email.split("@")[1] !== "elpoli.edu.co") {
      return json({
        ENV: frontEnv,
        error: "Solo puedes ingresar con el correo institucional.",
        shouldLogout: true,
      });
    }

    return createUserSession({
      userId: tokenClaim.sub,
      email: tokenClaim.email,
      username: tokenClaim["cognito:username"],
      redirectPath: "/",
    });
  }

  return json({
    ENV: frontEnv,
  });
}

export default function Login() {
  const data = useLoaderData();
  const [loading, setLoading] = React.useState(false); // Estado del spinner
  const redirectSearchParams = new URLSearchParams();
  const logoutSearchParams = new URLSearchParams();

  redirectSearchParams.append("response_type", "code");
  redirectSearchParams.append("client_id", data.ENV.APP_CLIENT_ID);
  redirectSearchParams.append("redirect_uri", `${data.ENV.DOMAIN}/login`);
  redirectSearchParams.append("identity_provider", "Google");
  redirectSearchParams.append("scope", "email openid");

  logoutSearchParams.append("client_id", data.ENV.APP_CLIENT_ID);
  logoutSearchParams.append("logout_uri", `${data.ENV.DOMAIN}/login`);
  logoutSearchParams.append("redirect_uri", `${data.ENV.DOMAIN}/login`);
  logoutSearchParams.append("response_type", "code");

  const handleLogin = () => {
    // mostrar spinner
    setLoading(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#1c6b44] relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-[#196844]"></div>
        </div>
      )}

      {/* Logo PCJIC */}
      <img
        src="../public/img/logo_poli.png"
        alt="Logo"
        className="absolute top-4 left-4 w-32 sm:w-60 h-auto" //h-auto: para responsive
      />

      {/* Logo Polisales */}
      <img
        src="../public/img/logo_polisales_white.png"
        alt="Logo"
        className="absolute top-4 right-4 w-24 sm:w-40 h-auto"
      />

      <h1 className="text-4xl sm:text-8xl font-bold text-white mt-18 mb-8">
        POLIsales
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 md:w-1/3 w-full z-10 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-4">
          Inicia Sesión
        </h2>

        {!data.shouldLogout && (
          <a
            onClick={handleLogin}
            className="w-full flex justify-center items-center bg-[#196844] text-white font-medium py-2 px-4 rounded-md hover:bg-[#024006] transition-colors duration-300 focus:ring-4 focus:ring-[#A3BF3F] focus:outline-none"
            href={`${
              data.ENV.COGNITO_DOMAIN
            }/oauth2/authorize?${redirectSearchParams.toString()}`}
          >
            Iniciar sesión con Google
          </a>
        )}
        {data.shouldLogout && (
          <a
            onClick={handleLogin}
            className="w-full flex justify-center items-center bg-[#196844] text-white font-medium py-2 px-4 rounded-md hover:bg-[#024006] transition-colors duration-300 focus:ring-4 focus:ring-[#A3BF3F] focus:outline-none"
            href={`${
              data.ENV.COGNITO_DOMAIN
            }/logout?${logoutSearchParams.toString()}`}
          >
            Cerrar sesión en Google
          </a>
        )}
        {data.error && (
          <p className="mt-3 text-center text-red-600 text-sm">{data.error}</p>
        )}
      </div>
    </div>
  );
}
