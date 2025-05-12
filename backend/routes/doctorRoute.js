import express from "express";
import DoctorController from "../controller/DoctorController.js";

const router = express.Router();

router.get('/getDoctors',DoctorController.showDoctors)
router.put('/addDoctor',DoctorController.addDoctor)
router.delete("/deleteDoctor/:id", DoctorController.deleteDoctor);
router.put('/updateDoctor/:id',DoctorController.updateDoctor)
export default router