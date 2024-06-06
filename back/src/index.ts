import express from "express";
import cors from "cors";
import authRouter from "./router/auth.router";
import postRouter from "./router/post.router";
import profileRouter from "./router/profile.router";
import searchRouter from "./router/search.router";
import followerRouter from "./router/follower.router";
import commentRouter from "./router/comment.router";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello World");
});

app.use(authRouter);
app.use(postRouter);
app.use(profileRouter);
app.use(searchRouter);
app.use(followerRouter);
app.use(commentRouter);

export default app;
