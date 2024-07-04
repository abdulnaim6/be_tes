import express from "express";
import vehicleTypeController from "../controller/vehicle_type.controller.js";

const router = express.Router();

router.get("/vehicletype", vehicleTypeController.listVehicle);
router.post("/vehicletype", vehicleTypeController.createVehicle);
router.patch("/vehicletype/:id", vehicleTypeController.updateVehicle);
router.delete("/vehicletype/:id", vehicleTypeController.deleteVehicle);

export default router;
