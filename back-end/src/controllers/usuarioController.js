import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT id, nome, email, tipo FROM usuarios ORDER BY id";
    conexao.query(sql, callback);
};

export function buscarPorId(id, callback) {
    const sql = "SELECT id, nome, email, tipo FROM usuarios WHERE id = ?";
    conexao.query(sql, [id], callback);
};

export function buscarPorEmail(email, callback) {
    const sql = "SELECT * FROM usuarios WHERE email = ?";
    conexao.query(sql, [email], callback);
};

export function criar(dados, callback) {
    const sql = "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";
    conexao.query(sql, [dados.nome, dados.email, dados.senha, dados.tipo || 'cliente'], callback);
};

export function atualizar(id, dados, callback) {
    const sql = "UPDATE usuarios SET nome = ?, email = ?, tipo = ? WHERE id = ?";
    conexao.query(sql, [dados.nome, dados.email, dados.tipo, id], callback);
};

export function excluir(id, callback) {
    const sql = "DELETE FROM usuarios WHERE id = ?";
    conexao.query(sql, [id], callback);
};