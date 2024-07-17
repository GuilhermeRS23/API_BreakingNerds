const userService = require('../services/User.service');

 const create = async (req, res) => {
    const { nome, username, email, password, avatar, background } = req.body;

    if (!nome || !username || !email || !password || !avatar || !background) {
        res.status(400)
            .send({ message: "Falha ao enviar os dados! Verificar todos os campos." })
    }

    const user = await userService.create(req.body);
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

module.exports = {
    create,
};
