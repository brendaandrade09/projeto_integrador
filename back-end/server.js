const express = require("express");
const cors = require("cors");
const conexao = require("./db.js");

const app = express();

app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
