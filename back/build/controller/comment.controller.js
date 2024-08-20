"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePostComment = handlePostComment;
exports.handleGetPostComments = handleGetPostComments;
exports.handleCanComment = handleCanComment;
const comment_services_1 = require("../services/comment.services");
async function handlePostComment(req, res) {
    const { id_user, id_post, comment } = req.body;
    const result = await (0, comment_services_1.postComment)(id_user, id_post, comment);
    return res.status(200).json(result);
}
async function handleGetPostComments(req, res) {
    const { id_post } = req.body;
    const result = await (0, comment_services_1.getPostComments)(id_post);
    return res.status(200).json(result);
}
async function handleCanComment(req, res) {
    const { id_post, id_user } = req.body;
    const result = await (0, comment_services_1.canComment)(id_post, id_user);
    if (!result) {
        return res.status(400).json({ message: "You can't comment" });
    }
    return res.status(200).json(result);
}
