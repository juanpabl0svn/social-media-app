"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controller_1 = require("../controller/search.controller");
const searchRouter = (0, express_1.Router)();
searchRouter.post("/search", search_controller_1.handleUserSearch);
searchRouter.get(`/users/:id_user`, search_controller_1.handleUserProfile);
exports.default = searchRouter;
