import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createGame, findAllGames, findById, topGame, searchByTitle, searchByUser, updateGame, deleteGame, likeGame, addComment, deleteComment } from "../controllers/game.controller.js"

const router = Router();

router.post('/create', authMiddleware, createGame);

router.get('/', findAllGames);
router.get('/top', topGame);
router.get('/search', searchByTitle);
router.get('/:id', authMiddleware, findById);
router.get('/byUserId', authMiddleware, searchByUser);

router.patch("update/:id", authMiddleware, updateGame);
router.patch("/:id/like", authMiddleware, likeGame);
router.patch("/:id/comment", authMiddleware, addComment);
router.patch("/:idGame/:idComment/comment", authMiddleware, deleteComment);

router.delete("delete/:id", authMiddleware, deleteGame);

export default router;
