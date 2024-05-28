import { Router } from "express";
import { handleUserProfile, handleUserSearch } from "../controller/search.controller";

const searchRouter = Router();

searchRouter.post("/search", handleUserSearch);
searchRouter.get(`/users/:userId`, handleUserProfile);

export default searchRouter;
