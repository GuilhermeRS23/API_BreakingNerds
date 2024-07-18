const userService = require('../services/User.service');
const mongoose = require('mongoose');

const create = async (req, res) => {
    const { nome, username, email, password, avatar, background } = req.body;

    if (!nome || !username || !email || !password || !avatar || !background) {
        res.status(400)
            .send({ message: "Falha ao enviar os dados! Verificar todos os campos." })
    }

    const user = await userService.createService(req.body);
    if (!user) {
        return res.status(400)
            .send({ message: "Erro ao criar Usuário" })
    }

    res.status(201).send({
        message: "Usuário criado com sucesso!",
        user: {
            id: user._id,
            nome,
            username,
            email,
            avatar,
            background
        }
    })
};

const findAllUsers = async (req, res) => {
    const users = await userService.findAllService();

    if (users.length === 0) {
        return res.status(400)
            .send({ message: "Todos usuários registrados" })
    }
    res.send(users)
}

const findByID = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400)
            .send({ message: "ID inválido" });
    }

    const user = await userService.findByIdService(id);

    if (!user) {
        return res.status(400)
            .send({ message: "Usuário não encontrado" })
    };

    res.send(user);
}

module.exports = {
    create,
    findAllUsers,
    findByID
};
