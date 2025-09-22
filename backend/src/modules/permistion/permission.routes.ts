import { Router } from "express";
import * as AuthController from "./permission.controller";

const router = Router();

router.post("/roles", AuthController.createNewRole);


export default router;