import { Router } from "express";
import { getMyDataRoute, handleGetUser, handleUpdateProfile } from "../controller/profile.controller";

const profileRouter = Router()

profileRouter.post('/update_profile', handleUpdateProfile)
profileRouter.post('/getUser', handleGetUser)

profileRouter.post('/get-my-data', getMyDataRoute)

export default profileRouter;