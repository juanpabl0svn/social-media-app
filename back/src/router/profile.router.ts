import { Router } from "express";
import {
  getMyDataRoute,
  getUserDataRoute,
  handleGetUser,
  handleUpdateProfile,
} from "../controller/profile.controller";

const profileRouter = Router();

profileRouter.post("/updateProfile", handleUpdateProfile);
profileRouter.post("/getUser", handleGetUser);

profileRouter.post("/getMyData", getMyDataRoute);

profileRouter.post("/getUserData", getUserDataRoute);

export default profileRouter;
