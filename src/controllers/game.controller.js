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
        let {limit, offset} = req.query;
        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5
        }
        if (!offset) {
            offset = 0
        }

        const games = await gameService.findAllService(offset, limit);
        const total = await gameService.countGames();
        const currentUrl = req.baseUrl;

        const nextGames = offset + limit;
        const nextUrl = nextGames < total ? `${currentUrl}?limit=${limit}&offset=${nextGames}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (games.length === 0) {
            return res.status(400)
                .send({ message: "Nenhum jogo registrado" });
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: games.map((game) => ({
                id: game._id,
                title: game.title,
                description: game.description,
                cover: game.cover,
                likes: game.likes,
                comments: game.comments,
                name: game.User.name,
                userName: game.User.userName,
                userAvatar: game.User.userAvatar,
            }))
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export default { createGame, findAllGames };
