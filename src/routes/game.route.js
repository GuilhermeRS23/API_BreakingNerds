import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createGame, findAllGames, findById, topGame } from "../controllers/game.controller.js"

const router = Router();

router.post('/',authMiddleware, createGame);
router.get('/', findAllGames);
router.get('/top', topGame);
router.get('/:id', findById);

export default router;
