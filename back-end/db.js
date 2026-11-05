import "dotenv/config";
import mariadb from "mariadb";

const conexao = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5
});


conexao.getConnection()
    .then(conn => {
        console.log("Banco conectado!");
        conn.release(); 
    })
    .catch(erro => {
        console.log("Erro na conexão:", erro);
    });

export default conexao;
