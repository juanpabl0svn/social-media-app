import { Request, Response } from "express";
import { getAllPosts, getAllUserPosts } from "../services/post.services";

export async function handleGetAllPosts(res:Response) {
    const posts = await getAllPosts()
    return res.status(200).json({data: posts})
}

export async function handleGetUserPosts (req:Request, res:Response){
    const user = req.params.userId
    const posts = await getAllUserPosts(user)
    return res.status(200).json({data: posts})
}