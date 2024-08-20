"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogInRoute = handleLogInRoute;
exports.handleVerifyRoute = handleVerifyRoute;
const user_services_1 = require("../services/user.services");
async function handleLogInRoute(req, res) {
    const { username, password } = req.body;
    if (!username || username == null || !password || password == null) {
        return res
            .status(400)
            .json({ message: "Usuario y contraseña son requeridos" });
    }
    const user = await (0, user_services_1.logInUser)(username, password);
    if (!user) {
        return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
    }
    const token = (0, user_services_1.setToken)(user.id_user);
    return res
        .setHeader("Set-Cookie", `token=${token}`)
        .status(200)
        .json({ ...user, token });
}
async function handleVerifyRoute(req, res) {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }
    const user = (0, user_services_1.verifyUser)(token);
    if (!user) {
        return res.status(400).json({ message: "No valid token" });
    }
    const userData = await (0, user_services_1.getUser)(+user);
    if (!userData) {
        return res.status(400).json({ message: "User no exists" });
    }
    return res.status(200).json(userData);
}
