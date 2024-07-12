const soma = (req, res) => {
    const soma = 100 + 2;

    res.send({ soma: soma });
}

const hello = (req, res) => {
    res.send("Hello World!");
}

module.exports = { soma, hello }