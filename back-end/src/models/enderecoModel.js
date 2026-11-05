import conexao from "../../db.js";
export function listar(callback) { 
    const sql = "SELECT * FROM enderecos ORDER BY id";
    conexao.query(sql, callback);
};
export function buscarPorId(id, callback) { 
    const sql = "SELECT * FROM enderecos WHERE id = ?";
    conexao.query(sql,[id], callback);
};
export function criar(dados, callback) { 
    const sql = "INSERT INTO enderecos (usuario_id, numero, bairro, cidade, estado, cep) VALUES (?, ?, ?, ?, ?, ?)";
    conexao.query(sql,[dados.titulo, dados.ano_lancamento, dados.estudio_id], callback);
};
export function atualizar(id, dados, callback) { 
    const sql = "UPDATE enderecos SET usuario_id = ?, numero = ?, bairro = ?, cidade = ?, estado = ?, cep = ? WHERE id = ?";
    conexao.query(sql,[dados.titulo, dados.ano_lancamento, dados.estudio_id, id], callback);
};
export function excluir(id, callback) { 
    const sql = "DELETE FROM enderecos WHERE id = ?";
    conexao.query(sql,[id], callback);
};
