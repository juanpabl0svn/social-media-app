"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_router_1 = __importDefault(require("./router/auth.router"));
const post_router_1 = __importDefault(require("./router/post.router"));
const profile_router_1 = __importDefault(require("./router/profile.router"));
const search_router_1 = __importDefault(require("./router/search.router"));
const follower_router_1 = __importDefault(require("./router/follower.router"));
const comment_router_1 = __importDefault(require("./router/comment.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send("Hello World");
});
app.use(auth_router_1.default);
app.use(post_router_1.default);
app.use(profile_router_1.default);
app.use(search_router_1.default);
app.use(follower_router_1.default);
app.use(comment_router_1.default);
exports.default = app;
