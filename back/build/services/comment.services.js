"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postComment = postComment;
exports.getPostComments = getPostComments;
exports.canComment = canComment;
const db_postgres_1 = __importDefault(require("../db.postgres"));
const follower_services_1 = require("./follower.services");
async function postComment(id_user, id_post, comment) {
    try {
        const userCanComment = await canComment(id_post, id_user);
        if (!userCanComment)
            return null;
        const { data } = await db_postgres_1.default
            .from("comments")
            .insert({
            id_user,
            id_post,
            comment,
        })
            .select()
            .single();
        return data;
    }
    catch (err) {
        console.log("Error posting comment ", err);
        return null;
    }
}
async function getPostComments(id_post) {
    try {
        const { data } = await db_postgres_1.default
            .from("comments")
            .select(`
      id_comment,
      id_user,
      id_post,
      comment,
      comment_date,
      users!inner (username)
    `)
            .eq("id_post", id_post);
        return data;
    }
    catch (err) {
        console.error("Error getting post comments ", err);
        throw err;
    }
}
async function canComment(id_post, id_user) {
    try {
        const { data: post } = await db_postgres_1.default
            .from("posts")
            .select("*")
            .eq("id_post", id_post)
            .single();
        if (!post) {
            return false;
        }
        if (post.id_user == id_user)
            return true;
        return await (0, follower_services_1.isFollowing)(post.id_user, id_user);
    }
    catch (err) {
        console.error("Error validating if can comment ", err);
        throw err;
    }
}
