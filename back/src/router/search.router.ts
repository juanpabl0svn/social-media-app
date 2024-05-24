import { Router } from "express";
import { handleUserSearch } from "../controller/search.controller";

const searchRouter = Router()

searchRouter.post('/search',handleUserSearch)

export default searchRouter;