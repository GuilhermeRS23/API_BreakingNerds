import mongoose from 'mongoose';

const connetcDatabase = () => {
    console.log("Aguarde, conectando ao Banco de Dados...")

    mongoose.connect(process.env.URI_MOOGODB)
        .then(() => console.log("Banco MongoDB Atlas conectado."))
        .catch((error) => console.log(error));
};

export default connetcDatabase;
