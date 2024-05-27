import { Request, Response } from "express";
import { getUser, getUsers } from "../services/user.services";

export async function handleUserSearch(req: Request, res: Response) {
  const users = await getUsers(req.body.searchString);
  return res.status(200).json({ users: users });
}

export async function handleUserProfile(req: Request, res: Response) {
  const { userId } = req.params;
  const user = await getUser(parseInt(userId))
  return res.status(200).json({user: user})
}
