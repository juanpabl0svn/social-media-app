import { Router} from "express";
import { createPost, handleGetAllPosts, handleGetUserPosts } from "../controller/post.controller";
import multer, { memoryStorage } from "multer";

const postRouter = Router();
const upload = multer({storage: memoryStorage()})

postRouter.get("/get_all_post", handleGetAllPosts);
postRouter.get("/get_all_post/:userId", handleGetUserPosts);
postRouter.post("/create_post", upload.single('file') ,createPost)


export default postRouter;
