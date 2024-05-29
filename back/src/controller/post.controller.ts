import { Request, Response } from "express";
import { getAllPosts, getAllUserPosts } from "../services/post.services";
import { createNewPost } from "../services/post.services";

export async function handleGetAllPosts(_req: Request, res: Response) {
  const posts = await getAllPosts();
  return res.json({ data: posts });
}

export async function handleGetUserPosts(req: Request, res: Response) {
  const user = req.params.userId;
  const posts = await getAllUserPosts(user);
  return res.json({ data: posts });
}

export async function createPost(req: Request, res: Response) {
  const result = await createNewPost(req.file, req.body);
  return res.json({ message: "done", data: result });
}
