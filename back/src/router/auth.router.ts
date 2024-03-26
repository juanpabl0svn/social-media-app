import { Router, Request, Response } from "express";
import { addUser } from "../services/register/registerServices";

const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  if (!username || username == null || !password || password == null) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  return res.status(200).json({ message: "User logged in" });
});

authRouter.post("/register", async(req: Request, res: Response) => {
  const {
    name,
    username,
    email,
    password,
  }: { name: string; username: string; email: string; password: string } =
    req.body;

  if (
    !username ||
    username == null ||
    !email ||
    email == null ||
    !password ||
    password == null ||
    !name ||
    name == null
  ) {
    return res
      .status(400)
      .json({ message: "Username, email and password are required" });
  }

  await addUser(name, username, email, password);

  return res
    .setHeader("Set-Cookie", `token=${username}`)
    .status(200)
    .json({ message: "User registered" });
});

export default authRouter;
