import { Router } from "express";
import * as PatientController from "./patient.controller";

const router = Router();

router.get("/information/:id",PatientController.getPatientInformation);
router.put("/information/:id",PatientController.updatePatientInformation);

export default router;