import { Router} from "express";
import { handleRegisterRoute } from "../controller/register.controller";
import { handleLogInRoute, handleVerifyRoute } from "../controller/login.controller";

const authRouter = Router();

authRouter.post("/login", handleLogInRoute);

authRouter.post("/register", handleRegisterRoute);


authRouter.post('/verify', handleVerifyRoute)

export default authRouter;
