import { Router } from "express";
import { handleFollowReq, handleUserFollows } from "../controller/follower.controller";

const followerRouter = Router();

followerRouter.post("/followreq", handleFollowReq);
followerRouter.post("/get_user_follows", handleUserFollows);

export default followerRouter;
