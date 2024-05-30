import { Router } from "express";
import {
  createPost,
  handleGetAllPosts,
  handleGetUserPosts,
} from "../controller/post.controller";
import multer, { memoryStorage } from "multer";

const postRouter = Router();
const upload = multer({ storage: memoryStorage() });

postRouter.get("/getPosts", handleGetAllPosts);
postRouter.get("/getPosts/:userId", handleGetUserPosts);
postRouter.post("/createPost", upload.single("file"), createPost);

export default postRouter;
