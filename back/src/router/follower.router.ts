import { Router } from "express";
import {
  handleAcceptFollow,
  handleFollowReq,
  handleIsFollowing,
  handleRejectFollow,
  handleUserFollows,
} from "../controller/follower.controller";

const followerRouter = Router();

followerRouter.post("/follow", handleFollowReq);
followerRouter.post("/getUserFollows", handleUserFollows);
followerRouter.post("/acceptFollow", handleAcceptFollow);
followerRouter.post("/rejectFollow", handleRejectFollow);
followerRouter.post("/isFollowing", handleIsFollowing)

export default followerRouter;
