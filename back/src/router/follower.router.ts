import { Router } from "express";
import { handleFollowReq } from "../controller/follower.controller";

const followerRouter = Router();

followerRouter.post("/followreq", handleFollowReq);
followerRouter.post("/get_user_follows", handleFollowReq);

export default followerRouter;
