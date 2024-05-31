import { Request, Response } from "express";
import {
  getUser,
  logInUser,
  setToken,
  verifyUser,
} from "../services/user.services";

export async function handleLogInRoute(req: Request, res: Response) {
  const { username, password }: { username: string; password: string } =
    req.body;

  if (!username || username == null || !password || password == null) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const user = await logInUser(username, password);

  if (!user || user instanceof Error) {
    return res.status(400).json({ message: user.message });
  }

  const token = setToken(user.id_user);

  return res
    .setHeader("Set-Cookie", `token=${token}`)
    .status(200)
    .json({ ...user, token });
}

export async function handleVerifyRoute(req: Request, res: Response) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  const user = verifyUser(token);

  if (!user) {
    return res.status(400).json({ message: "No valid token" });
  }

  const userData = await getUser(+user);

  if (!userData) {
    return res.status(400).json({ message: "User no exists" });
  }

  return res.status(200).json(userData);
}
