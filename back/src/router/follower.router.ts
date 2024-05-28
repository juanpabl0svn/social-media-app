import { Router } from "express";
import {
  handleAcceptFollow,
  handleFollowReq,
  handleRejectFollow,
  handleUserFollows,
} from "../controller/follower.controller";

const followerRouter = Router();

followerRouter.post("/followreq", handleFollowReq);
followerRouter.post("/get_user_follows", handleUserFollows);
followerRouter.post("/acceptFollow", handleAcceptFollow);
followerRouter.post("/rejectFollow", handleRejectFollow);

export default followerRouter;
