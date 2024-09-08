import { useLoaderData, json, useLocation } from "@remix-run/react";

export async function loader() {
  return json({
    ENV: {
      COGNITO_DOMAIN: process.env.COGNITO_DOMAIN,
      APP_CLIENT_ID: process.env.APP_CLIENT_ID,
      DOMAIN: process.env.DOMAIN,
    },
  });
}

export default function Auth() {
  const data = useLoaderData();
  const location = useLocation();
  const redirectSearchParams = new URLSearchParams();

  redirectSearchParams.append("response_type", "code");
  redirectSearchParams.append("client_id", data.ENV.APP_CLIENT_ID);
  redirectSearchParams.append("redirect_uri", `${data.ENV.DOMAIN}/auth`);
  redirectSearchParams.append("identity_provider", "Google");
  redirectSearchParams.append("scope", "email openid");

  return (
    <div>
      <h1>PAGINA LOGIN</h1>
      <a
        href={`${
          data.ENV.COGNITO_DOMAIN
        }/oauth2/authorize?${redirectSearchParams.toString()}`}
      >
        Ir a login con Google
      </a>
    </div>
  );
}
