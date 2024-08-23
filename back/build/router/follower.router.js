"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const follower_controller_1 = require("../controller/follower.controller");
const followerRouter = (0, express_1.Router)();
followerRouter.post("/follow", follower_controller_1.handleFollowReq);
followerRouter.post("/getUserFollows", follower_controller_1.handleUserFollows);
followerRouter.post("/acceptFollow", follower_controller_1.handleAcceptFollow);
followerRouter.post("/rejectFollow", follower_controller_1.handleRejectFollow);
followerRouter.post("/isFollowing", follower_controller_1.handleIsFollowing);
exports.default = followerRouter;