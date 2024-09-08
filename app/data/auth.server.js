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
    throw redirect("/auth");
  }

  return userId;
}
