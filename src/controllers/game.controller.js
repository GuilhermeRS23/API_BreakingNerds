import gameService from "../services/game.service.js";

const createGame = async (req, res) => {
    try {
        const { title, description, cover } = req.body;

        if (!title || !description || !cover) {
            res.status(400)
                .send({ message: "Falha ao enviar os dados! Verificar todos os campos." })
        }

        await gameService.createService({
            title,
            description,
            cover,
            User: req.userId
        });

        res.status(201)
            .send({ message: "Game criado com sucesso" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const findAllGames = async (req, res) => {
    try {
        const games = await gameService.findAllService();
        if (games.length === 0) {
            return res.status(400)
                .send({ message: "Nenhum jogo registrado" });
        }
        res.send(games);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export default { createGame, findAllGames };
