import { Request, Response } from "express";
import { updateProfile } from "../services/user.services";

export async function handleUpdateProfile(req:Request, res:Response) {
    const {
        id_user,
        name,
        username,
        email,
        password,
        date,
      }: {
        id_user: number,
        name: string;
        username: string;
        email: string;
        password: string;
        date: Date;
      } = req.body;
      
    const user = await updateProfile(id_user, name, username, email, password, date)

    return res
        .status(201)
        .json({ message: "User updated", userData: user});
}