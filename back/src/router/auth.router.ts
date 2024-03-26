import { Router, Request, Response } from "express";
import { handleRegisterRoute } from "../controller/register.services";

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

authRouter.post("/register", handleRegisterRoute);

export default authRouter;
