import { Router } from "express";
import { handleGetUser, handleUpdateProfile } from "../controller/profile.controller";

const profileRouter = Router()

profileRouter.post('/update_profile', handleUpdateProfile)
profileRouter.post('/getUser', handleGetUser)

export default profileRouter;