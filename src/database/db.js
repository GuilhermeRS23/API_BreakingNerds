import mongoose from 'mongoose';

const connetcDatabase = () => {
    console.log("Aguarde, conectando ao Banco de Dados...")

    mongoose.connect("mongodb+srv://GuilhermeRS:TxncPjjh1lWPutOI@breakingnews.bd5gs12.mongodb.net/?retryWrites=true&w=majority&appName=BreakingNews"
    )
        .then(() => console.log("Banco MongoDB Atlas conectado."))
        .catch((error) => console.log(error));
};

export default connetcDatabase;
