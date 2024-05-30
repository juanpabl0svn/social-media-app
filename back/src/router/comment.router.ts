import { Router } from "express";
import {
  handleCanComment,
  handleGetPostComments,
  handlePostComment,
} from "../controller/comment.controller";

const commentRouter = Router();

commentRouter.post("/comment", handlePostComment);
commentRouter.post("/getComments", handleGetPostComments);
commentRouter.post("/canComment", handleCanComment);

export default commentRouter;
