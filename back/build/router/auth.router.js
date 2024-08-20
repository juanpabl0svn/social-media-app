"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = require("../controller/register.controller");
const login_controller_1 = require("../controller/login.controller");
const authRouter = (0, express_1.Router)();
authRouter.post("/login", login_controller_1.handleLogInRoute);
authRouter.post("/register", register_controller_1.handleRegisterRoute);
authRouter.post('/verify', login_controller_1.handleVerifyRoute);
exports.default = authRouter;
