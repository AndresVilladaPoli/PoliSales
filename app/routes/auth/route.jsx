import { useLoaderData, json } from "@remix-run/react";
import { jwtDecode } from "jwt-decode";
import { createUserSession } from "../../data/auth.server";

export async function loader({ request }) {
  const { COGNITO_DOMAIN, APP_CLIENT_ID, APP_CLIENT_SECRET, DOMAIN } =
    process.env;

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  let userInfo;

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
        redirect_uri: `${DOMAIN}/auth`,
      }),
    });

    const cognitoResponse = await response.json();

    if (!response.ok) {
      throw new Error(
        `Error al obtener el token de Cognito: ${cognitoResponse.error}`,
      );
    }

    const tokenClaim = jwtDecode(cognitoResponse.id_token);
    return createUserSession({
      userId: tokenClaim.sub,
      email: tokenClaim.email,
      username: tokenClaim["cognito:username"],
      redirectPath: "/",
    });
  }

  return json({
    ENV: {
      COGNITO_DOMAIN,
      APP_CLIENT_ID,
      DOMAIN,
    },
  });
}

export default function Auth() {
  const data = useLoaderData();
  const redirectSearchParams = new URLSearchParams();

  redirectSearchParams.append("response_type", "code");
  redirectSearchParams.append("client_id", data.ENV.APP_CLIENT_ID);
  redirectSearchParams.append("redirect_uri", `${data.ENV.DOMAIN}/auth`);
  redirectSearchParams.append("identity_provider", "Google");
  redirectSearchParams.append("scope", "email openid");

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="my-3 text-2xl text-orange-700">Inicia sesión</h1>
      <a
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
        href={`${
          data.ENV.COGNITO_DOMAIN
        }/oauth2/authorize?${redirectSearchParams.toString()}`}
      >
        Iniciar sesión con Google
      </a>
    </div>
  );
}
