const express = require('express')
const userRoute = require('./src/routes/user.router')
const app = express()
const port = 3000

app.use(express.json());
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Servidor rodado na porta ${port}`)
});
