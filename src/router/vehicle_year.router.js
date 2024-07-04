import express from "express";
import vehicleYearController from "../controller/vehicle_year.controller.js";

const router = express.Router();

router.get("/year", vehicleYearController.listYear);
router.post("/year", vehicleYearController.createYear);
router.patch("/year/:id", vehicleYearController.updateYear);
router.delete("/year/:id", vehicleYearController.deleteYear);

export default router;
