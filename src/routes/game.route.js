import { Router } from "express";
import gameController from "../controllers/game.controller.js"

const router = Router();

router.post('/', gameController.createGame);
router.get('/', gameController.findAllGames);

export default router;
