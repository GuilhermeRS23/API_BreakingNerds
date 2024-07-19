import express from 'express';
import userRoute from './src/routes/user.router.js';
import connetcDatabase from "./src/database/db.js";

const app = express()
const port = 3000

connetcDatabase();
app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Servidor rodado na porta ${port}`)
});
