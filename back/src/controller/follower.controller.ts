import { Request, Response } from "express";
import { followReq, getUserFollows } from "../services/follower.services";

export async function handleFollowReq(req: Request, res: Response) {
  const { userReq, userToFollow } = req.body;
  const result = followReq(userReq, userToFollow);
  return res.status(200).json({ result: result });
}

export async function handleUserFollows(req: Request, res: Response) {
  const { userId } = req.body;
  const result = await getUserFollows(userId);
  return res.status(200).json({ result:result });
}
