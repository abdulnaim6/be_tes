import express from "express";
import vehicleController from "../controller/vehicle_brand.controller.js";
import verifyToken from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/vehicle", vehicleController.listVehicle);
router.get("/search", vehicleController.search);
router.get("/pagination", vehicleController.pagination);
router.post("/vehicle", verifyToken, vehicleController.createVehicle);
router.patch("/vehicle/:id", verifyToken, vehicleController.updateVehicle);
router.delete("/vehicle/:id", verifyToken, vehicleController.deleteVehicle);

export default router;
