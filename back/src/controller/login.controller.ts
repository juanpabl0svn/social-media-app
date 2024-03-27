import { Request, Response } from "express";
import { logInUser } from "../services/user.services";

export async function handleLogInRoute(req: Request, res: Response) {
  const { username, password }: { username: string; password: string } =
    req.body;

  if (!username || username == null || !password || password == null) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const user = await logInUser(username, password);

  return res
    .setHeader("Set-Cookie", `token=${user.username}`)
    .status(200)
    .json({ message: "User logedIn" });
}
