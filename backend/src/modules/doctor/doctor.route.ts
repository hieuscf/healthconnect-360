import { Router } from "express";
import { createDoctor , getDoctors , updateDoctor , deleteDoctor} from "./doctor.controller";
const router = Router();

router.post("",createDoctor)
router.get("/" , getDoctors)
router.put("/:id" , updateDoctor)
router.delete("/:id" , deleteDoctor)
export default router;