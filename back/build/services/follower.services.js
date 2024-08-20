"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followReq = followReq;
exports.acceptFollowReq = acceptFollowReq;
exports.rejectFollowReq = rejectFollowReq;
exports.getUserFollows = getUserFollows;
exports.isFollowing = isFollowing;
const db_postgres_1 = __importDefault(require("../db.postgres"));
async function followReq(id_user, id_user_follower) {
    try {
        const { data } = await db_postgres_1.default
            .from("followers")
            .insert({
            id_user,
            id_user_follower,
        })
            .select();
        return data;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
async function acceptFollowReq(id_follow) {
    try {
        const { data } = await db_postgres_1.default
            .from("followers")
            .update({ state: "accepted" })
            .eq("id_follow", id_follow)
            .select();
        return data;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
async function rejectFollowReq(id_follow) {
    try {
        const { data } = await db_postgres_1.default
            .from("followers")
            .delete()
            .eq("id_follow", id_follow)
            .select();
        return data;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}
async function getUserFollows(id_user) {
    try {
        const { data } = await db_postgres_1.default
            .from("followers")
            .select(`
      id_follow,
      id_user,
      id_user_follower,
      state,
      users!followers_id_user_follower_fkey (id_user, username)
    `)
            .eq("id_user", id_user);
        return data;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
async function isFollowing(userId1, userId2) {
    try {
        const { data } = await db_postgres_1.default
            .from("followers")
            .select("*")
            .eq("id_user", userId1)
            .eq("id_user_follower", userId2)
            .single();
        if (!data)
            return false;
        return true;
    }
    catch (err) {
        console.error("Error finding follower relationship:", err);
        throw false;
    }
}
