import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

export async function createUserSession({
  userId,
  email,
  username,
  redirectPath,
}) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  session.set("email", email);
  session.set("username", username);

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function destroyUserSession(request) {
  const logoutSearchParams = new URLSearchParams();
  logoutSearchParams.append("client_id", process.env.APP_CLIENT_ID);
  logoutSearchParams.append("logout_uri", `${process.env.DOMAIN}/login`);

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  return redirect(
    `${process.env.COGNITO_DOMAIN}/logout?${logoutSearchParams.toString()}`,
    {
      headers: {
        "Set-Cookie": await sessionStorage.destroySession(session),
      },
    },
  );
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request);

  if (!userId) {
    return redirect("/login");
  }

  return userId;
}
