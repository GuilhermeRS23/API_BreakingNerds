import { Router } from "express";
import { validId, validUser } from '../middlewares/global.middleware.js';
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/create", userController.create);
router.get("/", userController.findAllUsers);
router.get("/:id", validId, validUser, userController.findByID);
router.patch("/update/:id", validId, validUser, userController.update);

export default router;