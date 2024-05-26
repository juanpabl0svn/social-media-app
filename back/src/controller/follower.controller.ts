import { Request, Response } from "express";
import { followReq, getUserFollows } from "../services/follower.services";

export async function handleFollowReq(req: Request, res: Response) {
  const { userReq, toFollow } = req.body;
  const result = followReq(userReq, toFollow);
  return res.status(200).json({ result });
}

export async function handleUserFollows(req: Request, res: Response) {
  const { userId } = req.body;
  const result = getUserFollows(userId);
  return res.status(200).json({ result });
}
