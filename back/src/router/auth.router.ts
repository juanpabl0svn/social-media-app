import { Router, Request, Response } from "express";

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

authRouter.post("/register", (req: Request, res: Response) => {
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

  return res
    .status(200)
    .json({ message: "User registered" })
    .setHeader("Set-Cookie", `token=${username});`);
});

export default authRouter;
