import { Router, Request, Response } from "express";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { username, password }: { username: string; password: string } =
    req.body;

  if (!username || username == null || !password || password == null) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  


});

export default router;
