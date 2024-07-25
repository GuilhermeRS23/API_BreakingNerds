import gameService from "../services/game.service.js";

const createGame = async (req, res) => {
    try {
        //Middleware 
        const { authorization } = req.headers;

        if (!authorization) {
            res.status(401)
                .send({ message: "Rota não autorizada" })
        };

        const parts = authorization.split(' ');
        if (parts.length !== 2) {
            return res.status(401)
                .send({ message: "Authorization inválido 1" })
        }

        const [schema, token] = parts;
        if (schema !== "Bearer") {
            return res.status(401)
                .send({ message: "Authorization inválido" })
        }

        const { title, description, cover } = req.body;

        if (!title || !description || !cover) {
            res.status(400)
                .send({ message: "Falha ao enviar os dados! Verificar todos os campos." })
        }

        await gameService.createService({
            title,
            description,
            cover,
            User: { _id: "669ef355a0cf92cf2c9e20df" }
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
