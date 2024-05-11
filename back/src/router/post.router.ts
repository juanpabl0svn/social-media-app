import { Router} from "express";
import { createPost, handleGetAllPosts, handleGetUserPosts } from "../controller/post.controller";

const postRouter = Router();

postRouter.get("/get_all_post", handleGetAllPosts);
postRouter.get("/get_all_post/:userId", handleGetUserPosts);
postRouter.post("/create_post", createPost)


export default postRouter;
