"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRegisterRoute = handleRegisterRoute;
const user_services_1 = require("../services/user.services");
async function handleRegisterRoute(req, res) {
    const { name, username, email, password, birth_date, } = req.body;
    console.log(req.body);
    if (!name ||
        !username ||
        !email ||
        !password ||
        !birth_date) {
        return res.status(400).json({ message: "Not enougth data" });
    }
    const user = await (0, user_services_1.registerUser)(name, username, email, password, birth_date);
    if (user.error) {
        return res.status(400).json({ error: user.error });
    }
    const token = (0, user_services_1.setToken)(user.id_user);
    return res
        .setHeader("Set-Cookie", `token=${token}`)
        .status(200)
        .json({ ...user, token });
    return res
        .setHeader("Set-Cookie", `token=${username}`)
        .status(200)
        .json(user);
}
