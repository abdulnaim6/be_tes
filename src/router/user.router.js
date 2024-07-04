import express from "express";
import userController from "../controller/user.controller.js";

const router = express.Router();

router.get("/users", userController.listUser);
router.post("/users", userController.createUser);
router.post("/login", userController.loginUser);
router.patch("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUsers);

export default router;
