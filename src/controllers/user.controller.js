const userService = require('../services/User.service');

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
    const id = req.id;
    const user = req.user;

    res.send(user);
}

const update = async (req, res) => {
    const { nome, username, email, password, avatar, background } = req.body;

    if (!nome && !username && !email && !password && !avatar && !background) {
        res.status(400)
            .send({ message: "Falha ao enviar ao atualizar os dados! Alterar pelo menos alguns campo" })
    }

    const {id, user} = req;

    await userService.updateService(
        id,
        nome,
        username,
        email,
        password,
        avatar,
        background
    );

    res.send({ message: "Usuário atualizado com sucesso!" })
}

module.exports = {
    create,
    findAllUsers,
    findByID,
    update
};
