import express from "express";
import cors from "cors";
import authRouter from "./router/auth.router";
import postRouter from "./router/post.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(postRouter)

export default app;
