import { createService, findAllService, topGameService, countGamesService, findByIdService, searchByTitleService, searchByUserService, updateGameService, deleteGameService, likeGameService, deleteLikeGameService, addCommentService, deleteCommentService } from "../services/game.service.js";

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
        if (!game) {
            return res.status(404)
                .send({ message: "Game não encontrado ou excluido" })
        }

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

        if (!title && !description && !cover) {
            return res.status(400)
                .send({ message: "Falha ao enviar os dados! Informe pelo menos um campos." })
        }

        const { id } = req.params;

        const games = await findByIdService(id);
        if (String(games.User._id) !== req.userId) {
            return res.status(400)
                .send({ message: "Você não pode alterar essa postagem" })
        };

        await updateGameService(id, title, description, cover);
        res.send({ message: "Postagem atualizada com sucesso!" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const deleteGame = async (req, res) => {
    try {
        const { id } = req.params;

        const games = await findByIdService(id);
        if (String(games.User._id) !== req.userId) {
            return res.status(400)
                .send({ message: "Você não pode deletar essa postagem" })
        };

        await deleteGameService(id);
        res.send({ message: "Postagem deletada com sucesso!" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const likeGame = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const gamesLike = await likeGameService(id, userId);
        if (!gamesLike) {
            await deleteLikeGameService(id, userId);
            return res.status(200).send({ message: "Like removido com sucesso!" });
        }

        res.send({ message: "Like adicionado com sucesso!" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const { comment } = req.body;

        if (!comment) {
            return res.status(400)
                .send({ message: "Não é permitido enviar o campo de comentários vazio." })
        };

        await addCommentService(id, comment, userId);

        res.send({ message: "Comentário adicionado com sucesso!" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { idGame, idComment } = req.params;
        const userId = req.userId;

        const commentDeleted = await deleteCommentService(idGame, idComment, userId);

        const commentFinder = commentDeleted.comments.find(
            (comment) => comment.idComment === idComment
        );

        if (!commentFinder) {
            return res.status(400)
                .send({ message: "Comentário não encontrado ou excluido" });
        }

        if (commentFinder.userId !== userId) {
            return res.status(400)
                .send({ message: "Você não pode remover esse comentário" })
        }

        res.send({ message: "Comentário removido com sucesso!" });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

//Erro exemplo  res.status(500).send({ message: error.message });