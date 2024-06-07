import { Response, Request } from "express";
import { registerUser, setToken } from "../services/user.services";

export async function handleRegisterRoute(req: Request, res: Response) {
  const {
    name,
    username,
    email,
    password,
    birth_date,
  }: {
    name: string;
    username: string;
    email: string;
    password: string;
    birth_date: string;
  } = req.body;

  console.log(req.body)

  if (
    !name ||
    !username ||
    !email ||
    !password ||
    !birth_date
  ) {
    return res.status(400).json({ message: "Not enougth data" });
  }

  const user = await registerUser(name, username, email, password, birth_date);

  if (user.error) {
    return res.status(400).json({ error: user.error });
  }

  const token = setToken(user.id_user);

  return res
    .setHeader("Set-Cookie", `token=${token}`)
    .status(200)
    .json({ ...user, token });

  return res
    .setHeader("Set-Cookie", `token=${username}`)
    .status(200)
    .json(user);
}
