import { Router } from "express";
import * as SpecializationController from "./specialization.controller";

const router = Router();

router.get("/", SpecializationController.getSpecializations);


export default router;
