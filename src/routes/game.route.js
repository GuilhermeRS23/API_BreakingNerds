import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createGame, findAllGames, findById, topGame, searchByTitle, searchByUser } from "../controllers/game.controller.js"

const router = Router();

router.post('/', authMiddleware, createGame);
router.get('/', findAllGames);
router.get('/top', topGame);
router.get('/search', searchByTitle);
router.get('/byUser', authMiddleware, searchByUser);

router.get('/:id', authMiddleware, findById);

export default router;
