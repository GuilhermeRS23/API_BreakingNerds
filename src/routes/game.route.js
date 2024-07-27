import { Router } from "express";
import gameController from "../controllers/game.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/',authMiddleware, gameController.createGame);
router.get('/', gameController.findAllGames);

export default router;
