import { Router} from "express";
import { handleRegisterRoute } from "../controller/register.controller";
import { handleLogInRoute } from "../controller/login.controller";

const authRouter = Router();

authRouter.post("/login", handleLogInRoute);

authRouter.post("/register", handleRegisterRoute);


export default authRouter;
