import { Router} from "express";
import { handleGetAllPosts, handleGetUserPosts } from "../controller/post.controller";

const postRouter = Router();

postRouter.get("/get_all_post", handleGetAllPosts);

postRouter.get("/get_all_post/:userId", handleGetUserPosts);


export default postRouter;
