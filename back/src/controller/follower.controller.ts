import { Request, Response } from "express";
import {
  acceptFollowReq,
  followReq,
  getUserFollows,
  isFollowing,
  rejectFollowReq,
} from "../services/follower.services";

export async function handleFollowReq(req: Request, res: Response) {
  const { userReq, userToFollow } = req.body;
  const result = followReq(userReq, userToFollow);
  return res.status(200).json({ result: result });
}

export async function handleUserFollows(req: Request, res: Response) {
  const { userId } = req.body;
  const result = await getUserFollows(userId);
  return res.status(200).json({ result: result });
}

export async function handleAcceptFollow(req: Request, res: Response) {
  const { followId } = req.body;
  const result = await acceptFollowReq(followId);
  return res.status(200).json(result);
}

export async function handleRejectFollow(req: Request, res: Response) {
  const { followId } = req.body;
  const result = await rejectFollowReq(followId);
  return res.status(200).json(result);
}

export async function handleIsFollowing(req: Request, res: Response) {
  const { userId1, userId2 } = req.body;
  const result = await isFollowing(userId1, userId2);
  return res.status(200).json(result)
}
