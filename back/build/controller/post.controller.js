"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGetAllPosts = handleGetAllPosts;
exports.handleGetUserPosts = handleGetUserPosts;
exports.createPost = createPost;
const post_services_1 = require("../services/post.services");
const post_services_2 = require("../services/post.services");
async function handleGetAllPosts(_req, res) {
    const posts = await (0, post_services_1.getAllPosts)();
    return res.json(posts);
}
async function handleGetUserPosts(req, res) {
    const user = req.params.userId;
    const posts = await (0, post_services_1.getAllUserPosts)(user);
    return res.json(posts);
}
async function createPost(req, res) {
    const result = await (0, post_services_2.createNewPost)(req.file, req.body);
    return res.json(result);
}
