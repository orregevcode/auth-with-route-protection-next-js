"use server";

import { getIronSession } from "iron-session";
import { defaultSessionData, SessionData, sessionOptions } from "./lib";
import { cookies } from "next/headers";
import db from "../db.json"; // Use relative path to db.json
import { redirect } from "next/navigation";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSessionData.isLoggedIn;
  }

  return session;
};

export const login = async (formData: FormData) => {
  const session = await getSession();
  const formusername = formData.get("username") as string;
  const password = formData.get("password") as string;

  // Find user in db.json
  const user = db.users.find(
    (u) => u.username === formusername && u.password === password
  );

  if (!user) {
    // Optionally redirect to an error page or show a message
    redirect("/login?error=1");
    return;
  }

  session.userId = user.id; // Assuming user has an id field
  session.username = user.username;
  session.role = user.role;
  session.isLoggedIn = true;
  await session.save();
  redirect("/profile");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login");
};
