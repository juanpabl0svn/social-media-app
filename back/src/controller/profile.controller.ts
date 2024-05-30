import { Request, Response } from "express";
import { getMyData, getUser, updateProfile } from "../services/user.services";

export async function handleUpdateProfile(req: Request, res: Response) {
  const {
    id_user,
    name,
    username,
    email,
    date,
  }: {
    id_user: number;
    name: string;
    username: string;
    email: string;
    date: Date;
  } = req.body.userData;

  const user = await updateProfile(id_user, name, username, email, date);

  return res.status(201).json({ message: "User updated", userData: user });
}

export async function handleGetUser(req: Request, res: Response) {
  const { userId } = req.body;
  const user = await getUser(userId);
  return res.status(200).json(user);
}

export async function getMyDataRoute(req: Request, res: Response) {
  const { id_user } = req.body;

  if (!id_user) {
    return res.status(400).json({ message: "Missing user id" });
  }

  const userData = await getMyData(id_user);

  console.log(userData);
  
  if (!userData) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(userData);
}
