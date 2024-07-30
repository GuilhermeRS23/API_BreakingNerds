import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import gameController from "../controllers/game.controller.js"

const router = Router();

router.post('/',authMiddleware, gameController.createGame);
router.get('/', gameController.findAllGames);
router.get('/top', gameController.topGame);

export default router;
