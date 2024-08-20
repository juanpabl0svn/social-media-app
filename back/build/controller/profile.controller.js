"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdateProfile = handleUpdateProfile;
exports.handleGetUser = handleGetUser;
exports.getMyDataRoute = getMyDataRoute;
exports.getUserDataRoute = getUserDataRoute;
const user_services_1 = require("../services/user.services");
async function handleUpdateProfile(req, res) {
    const { id_user, name, username, email, birth_date, password } = req.body;
    const user = await (0, user_services_1.updateProfile)(id_user, name, username, email, birth_date, password);
    if (!user) {
        return res.status(400).json({ message: "Username already in use, pick another" });
    }
    return res.status(201).json(user);
}
async function handleGetUser(req, res) {
    const { userId } = req.body;
    const user = await (0, user_services_1.getUser)(userId);
    return res.status(200).json(user);
}
async function getMyDataRoute(req, res) {
    const { id_user } = req.body;
    if (!id_user) {
        return res.status(400).json({ message: "Missing user id" });
    }
    const userData = await (0, user_services_1.getMyData)(id_user);
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(userData);
}
async function getUserDataRoute(req, res) {
    const { id_user, id_user_follower } = req.body;
    if (!id_user || !id_user_follower) {
        return res.status(400).json({ message: "Missing user(s)" });
    }
    const userData = await (0, user_services_1.getUserData)(+id_user, +id_user_follower);
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(userData);
}
