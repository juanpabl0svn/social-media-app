import { Router } from "express";
import { handleUpdateProfile } from "../controller/profile.controller";

const profileRouter = Router()

profileRouter.post('/update_profile', handleUpdateProfile)