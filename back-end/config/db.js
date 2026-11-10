import "dotenv/config";
import mariadb from "mariadb";

const conexao = mariadb.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// conexao.connect((erro) => {
//   if (erro) {
//     console.log("Erro na conexão:", erro);
//     return;
//   }

//   console.log("Banco conectado!");
// });

export default conexao;
