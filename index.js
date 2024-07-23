import express from 'express';
import dotenv from 'dotenv';
import connetcDatabase from "./src/database/db.js";

import userRoute from './src/routes/user.router.js';
import authRoute from './src/routes/auth.route.js';

dotenv.config();

const app = express()
const port = process.env.PORT || 3000;

connetcDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`Servidor rodado na porta ${port}`)
});
