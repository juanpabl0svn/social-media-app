import { Request, Response } from "express";
import { getUser, updateProfile } from "../services/user.services";

export async function handleUpdateProfile(req:Request, res:Response) {
    const {
        id_user,
        name,
        username,
        email,
        date,
      }: {
        id_user: number,
        name: string;
        username: string;
        email: string;
        date: Date;
      } = req.body;
      
    const user = await updateProfile(id_user, name, username, email, date)

    return res
        .status(201)
        .json({ message: "User updated", userData: user});
}

export async function handleGetUser(req:Request, res:Response) {
  const {userId} = req.body
  const user = await getUser(userId)
  return res.status(200).json(user)
}