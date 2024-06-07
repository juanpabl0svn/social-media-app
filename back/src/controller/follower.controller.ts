import { Request, Response } from "express";
import {
  acceptFollowReq,
  followReq,
  getUserFollows,
  isFollowing,
  rejectFollowReq,
} from "../services/follower.services";

export async function handleFollowReq(req: Request, res: Response) {
  const { id_user, id_user_follower } = req.body;
  const result = followReq(id_user, id_user_follower);
  return res.status(200).json({ result: result });
}

export async function handleUserFollows(req: Request, res: Response) {
  const { id_user } = req.body;
  const result = await getUserFollows(id_user);

  return res.status(200).json(result);
}

export async function handleAcceptFollow(req: Request, res: Response) {
  const { id_follow } = req.body;
  const result = await acceptFollowReq(id_follow);
  console.log({
    result,
  });
  if (!result)
    return res.status(400).json({ message: "Error accepting follow" });
  return res.status(200).json(result);
}

export async function handleRejectFollow(req: Request, res: Response) {
  const { id_follow } = req.body;
  const result = await rejectFollowReq(id_follow);
  if (!result)
    return res.status(400).json({ message: "Error rejecting follow" });
  return res.status(200).json(result);
}

export async function handleIsFollowing(req: Request, res: Response) {
  const { userId1, userId2 } = req.body;
  const result = await isFollowing(userId1, userId2);
  return res.status(200).json(result);
}
