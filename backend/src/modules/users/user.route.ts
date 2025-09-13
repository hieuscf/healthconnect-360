import { Router } from "express";
import * as UserController from "./user.controller";

const router = Router();

router.get("/overview", UserController.getUserOverview);
router.get("/detail/:id",UserController.getUserDetails);
router.put("/detail/:id",UserController.updateUserDetails);


export default router;
