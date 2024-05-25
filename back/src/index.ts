import express from "express";
import cors from "cors";
import authRouter from "./router/auth.router";
import postRouter from "./router/post.router";
import profileRouter from "./router/profile.router";
import searchRouter from "./router/search.router";
import followerRouter from "./router/follower.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(postRouter);
app.use(profileRouter);
app.use(searchRouter);
app.use(followerRouter);

export default app;
