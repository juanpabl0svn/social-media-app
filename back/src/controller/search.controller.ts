import { Request, Response } from "express";
import { getUsers } from "../services/user.services";

export async function handleUserSearch(req: Request, res: Response) {
  const users = await getUsers(req.body.searchString);
  return res.status(200).json({ users: users });
}
