"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserSearch = handleUserSearch;
exports.handleUserProfile = handleUserProfile;
const user_services_1 = require("../services/user.services");
async function handleUserSearch(req, res) {
    const { username } = req.body;
    const users = await (0, user_services_1.getUsers)(username);
    return res.status(200).json({ users: users });
}
async function handleUserProfile(req, res) {
    const { id_user } = req.params;
    const user = await (0, user_services_1.getUser)(parseInt(id_user));
    return res.status(200).json({ user: user });
}
