const mongoose = require('mongoose');

const connetcDatabase = () => {
    console.log("Agurade, conectando ao Banco de Dados...")

    mongoose.connect("mongodb+srv://GuilhermeRS:TxncPjjh1lWPutOI@breakingnews.bd5gs12.mongodb.net/?retryWrites=true&w=majority&appName=BreakingNews", { useNewUrlParser: true, useUnifiedTopology: true }
    )
        .then(() => console.log("Banco de Dados conectado."))
        .catch((error) => console.log(error));
};

module.exports = connetcDatabase;