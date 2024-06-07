import { Request, Response } from "express";
import {
  getMyData,
  getUser,
  getUserData,
  updateProfile,
} from "../services/user.services";

export async function handleUpdateProfile(req: Request, res: Response) {
  const {
    id_user,
    name,
    username,
    email,
    birth_date,
    password
  }: {
    id_user: number;
    name: string;
    username: string;
    email: string;
    birth_date: string;
    password: string;
  } = req.body;

  const user = await updateProfile(id_user, name, username, email, birth_date, password);

  if (!user) {
    return res.status(400).json({ message: "Username already in use, pick another" });
  }

  return res.status(201).json(user)
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

  if (!userData) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(userData);
}

export async function getUserDataRoute(req: Request, res: Response) {
  const { id_user, id_user_follower } = req.body;

  if (!id_user || !id_user_follower) {
    return res.status(400).json({ message: "Missing user(s)" });
  }

  const userData = await getUserData(+id_user, +id_user_follower);

  if (!userData) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(userData);
}
