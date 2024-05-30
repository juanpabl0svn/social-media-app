import { Request, Response } from "express";
import {
  canComment,
  getPostComments,
  postComment,
} from "../services/comment.services";

export async function handlePostComment(req: Request, res: Response) {
  const { id_user, id_post, comment } = req.body;
  const result = await postComment(id_user, id_post, comment);
  return res.status(200).json(result);
}

export async function handleGetPostComments(req: Request, res: Response) {
  const { id_post } = req.body;
  const result = await getPostComments(id_post);
  return res.status(200).json(result);
}

export async function handleCanComment(req: Request, res: Response) {
  const { id_post, id_user } = req.body;
  const result = await canComment(id_post, id_user);

  if (!result) {
    return res.status(400).json({ message: "You can't comment" });
  }
  return res.status(200).json(result);
}
