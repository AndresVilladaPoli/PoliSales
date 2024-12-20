import { createCookieSessionStorage, redirect } from "@remix-run/node";
import createUserDb from "./dynamodb/user/createUser";
import getUserByEmail from "./dynamodb/user/getUserByEmail";
import User from "../models/User";

const { SESSION_SECRET } = process.env;

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
  const savedUser = await getUserByEmail(email);
  if (!savedUser) {
    await createUserDb(new User(email, email));
  }

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
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  const response = await sessionStorage.destroySession(session);

  const logoutSearchParams = new URLSearchParams();
  logoutSearchParams.append("client_id", process.env.APP_CLIENT_ID);
  logoutSearchParams.append("logout_uri", `${process.env.DOMAIN}/login`);
  logoutSearchParams.append("redirect_uri", `${process.env.DOMAIN}/login`);
  logoutSearchParams.append("response_type", "code");

  return redirect(
    `${process.env.COGNITO_DOMAIN}/logout?${logoutSearchParams.toString()}`,
    {
      headers: {
        "Set-Cookie": response,
      },
    },
  );
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  const email = session.get("email");

  if (!email) {
    return null;
  }

  const savedUser = await getUserByEmail(email);
  if (!savedUser) {
    return null;
  }

  return savedUser;
}

export async function requireUserSession(request) {
  const savedUser = await getUserFromSession(request);

  if (!savedUser) {
    return redirect("/login");
  }

  return savedUser;
}
