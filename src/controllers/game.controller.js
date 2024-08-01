import { createService, findAllService, topGameService, countGamesService, findByIdService, searchByTitleService, searchByUserService, updateGameService } from "../services/game.service.js";

export const createGame = async (req, res) => {
    try {
        const { title, description, cover } = req.body;

        if (!title || !description || !cover) {
            return res.status(400)
                .send({ message: "Falha ao enviar os dados! Verificar todos os campos." })
        }

        await createService({
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

export const findAllGames = async (req, res) => {
    try {
        let { limit, offset } = req.query;
        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5
        }
        if (!offset) {
            offset = 0
        }

        const games = await findAllService(offset, limit);
        const total = await countGamesService();
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
                userName: game.User.username,
                userAvatar: game.User.avatar
            }))
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const topGame = async (req, res) => {
    try {
        const game = await topGameService();

        if (!game) {
            return res.status(400)
                .send({ message: "Nenhum jogo registrado" })
        }

        res.send({
            game: {
                id: game._id,
                title: game.title,
                description: game.description,
                cover: game.cover,
                likes: game.likes,
                comments: game.comments,
                name: game.User.name,
                userName: game.User.username,
                userAvatar: game.User.avatar
            }
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};

export const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const game = await findByIdService(id);

        return res.send({
            game: {
                id: game._id,
                title: game.title,
                description: game.description,
                cover: game.cover,
                likes: game.likes,
                comments: game.comments,
                name: game.User.name,
                userName: game.User.username,
                userAvatar: game.User.avatar
            }
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const searchByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const games = await searchByTitleService(title);

        if (games.length === 0) {
            return res.status(400)
                .send({ message: `Nenhum registro encontrado para o termo ${title}` });
        }

        res.send({
            results: games.map((game) => ({
                id: game._id,
                title: game.title,
                description: game.description,
                cover: game.cover,
                likes: game.likes,
                comments: game.comments,
                name: game.User.name,
                userName: game.User.username,
                userAvatar: game.User.avatar
            }))
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const searchByUser = async (req, res) => {
    try {
        const id = req.userId;
        const games = await searchByUserService(id);

        res.send({
            results: games.map((game) => ({
                id: game._id,
                title: game.title,
                description: game.description,
                cover: game.cover,
                likes: game.likes,
                comments: game.comments,
                name: game.User.name,
                userName: game.User.username,
                userAvatar: game.User.avatar
            }))
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const updateGame = async (req, res) => {
    try {
        const { title, description, cover } = req.body;
        const { id } = req.params;
        //Middleware
        if (!title && !description && !cover) {
            return res.status(400)
                .send({ message: "Falha ao enviar os dados! Informe pelo menos um campos." })
        }

        const games = await findByIdService(id);
        if (String(games.User._id) !== req.userId) {
            return res.status(400)
                .send({ message: "Você não pode altualizar essa postagem" })
        }

        await updateGameService(id, title, description, cover);
        res.send({ message: "Postagem atualizada com sucesso!" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
