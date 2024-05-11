import { Request, Response } from "express";
import { getAllPosts, getAllUserPosts } from "../services/post.services";
import { createNewPost } from "../services/post.services";

export async function handleGetAllPosts(req: Request, res:Response) {
    const posts = await getAllPosts()
    return res.json({data: posts})
}

export async function handleGetUserPosts (req:Request, res:Response){
    const user = req.params.userId
    const posts = await getAllUserPosts(user)
    return res.json({data: posts})
}

export async function createPost(req:Request, res:Response){
    const formData= await req.body.formData()
    const result = await createNewPost(formData)
    return res.json({message: result})
}