"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("../controller/comment.controller");
const commentRouter = (0, express_1.Router)();
commentRouter.post("/comment", comment_controller_1.handlePostComment);
commentRouter.post("/getComments", comment_controller_1.handleGetPostComments);
commentRouter.post("/canComment", comment_controller_1.handleCanComment);
exports.default = commentRouter;
