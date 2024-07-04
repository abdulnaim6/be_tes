import express from "express";
import pricelistController from "../controller/pricelist.controller.js";

const router = express.Router();

router.get("/pricelist", pricelistController.listPrice);
router.post("/pricelist", pricelistController.createPricelist);
router.patch("/pricelist/:id", pricelistController.updatePricelist);
router.delete("/pricelist/:id", pricelistController.deletePricelist);

export default router;
