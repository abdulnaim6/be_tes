import express from "express";
import vehicleModelController from "../controller/vehicle_model.controller.js";

const router = express.Router();

router.get("/vehiclemodel", vehicleModelController.listVehicle);
router.post("/vehiclemodel", vehicleModelController.createVehicle);
router.patch("/vehiclemodel/:id", vehicleModelController.updateVehicle);
router.delete("/vehiclemodel/:id", vehicleModelController.deleteVehicle);

export default router;
