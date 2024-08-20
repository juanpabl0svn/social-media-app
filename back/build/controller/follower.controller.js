"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFollowReq = handleFollowReq;
exports.handleUserFollows = handleUserFollows;
exports.handleAcceptFollow = handleAcceptFollow;
exports.handleRejectFollow = handleRejectFollow;
exports.handleIsFollowing = handleIsFollowing;
const follower_services_1 = require("../services/follower.services");
async function handleFollowReq(req, res) {
    const { id_user, id_user_follower } = req.body;
    const result = (0, follower_services_1.followReq)(id_user, id_user_follower);
    return res.status(200).json({ result: result });
}
async function handleUserFollows(req, res) {
    const { id_user } = req.body;
    const result = await (0, follower_services_1.getUserFollows)(id_user);
    return res.status(200).json(result);
}
async function handleAcceptFollow(req, res) {
    const { id_follow } = req.body;
    const result = await (0, follower_services_1.acceptFollowReq)(id_follow);
    console.log({
        result,
    });
    if (!result)
        return res.status(400).json({ message: "Error accepting follow" });
    return res.status(200).json(result);
}
async function handleRejectFollow(req, res) {
    const { id_follow } = req.body;
    const result = await (0, follower_services_1.rejectFollowReq)(id_follow);
    if (!result)
        return res.status(400).json({ message: "Error rejecting follow" });
    return res.status(200).json(result);
}
async function handleIsFollowing(req, res) {
    const { userId1, userId2 } = req.body;
    const result = await (0, follower_services_1.isFollowing)(userId1, userId2);
    return res.status(200).json(result);
}
