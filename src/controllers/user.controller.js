const create = (req, res) => {
    const { nome, username, email, password, avatar, background } = req.body;

    if (!nome || !username || !email || !password || !avatar || !background) {
        res.status(400)
            .send({ message: "Falha ao enviar os dados! Verificar todos os campos." })
    }
    res.status(201).send({
        message: "Usuário criado com sucesso!",
        user: {
            nome,
            username,
            email,
            avatar,
            background
        }
    })
};

module.exports = { create };
