import { Request, Response } from "express";
import { logInUser, setToken } from "../services/user.services";

export async function handleLogInRoute(req: Request, res: Response) {
  const { username, password }: { username: string; password: string } =
    req.body;

  if (!username || username == null || !password || password == null) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const user = await logInUser(username, password);

  if (user instanceof Error) {
    return res.status(400).json({ message: user.message });
  }

  const token = setToken(user.id_user);

  return res
    .setHeader("Set-Cookie", `token=${token}`)
    .status(200)
    .json({ message: "User logedIn", user: { ...user, token } });
}
