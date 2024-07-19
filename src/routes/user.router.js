import express from "express";
import { validId, validUser } from '../middlewares/global.middlewares.js';
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", userController.create);
router.get("/", userController.findAllUsers);
router.get("/:id", validId, validUser, userController.findByID);
router.patch("/:id", validId, validUser, userController.update);

export default router;