import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT p.*, c.nome AS categoria_nome FROM produtos p LEFT JOIN categorias c ON p.categoria_id = c.id ORDER BY p.id";
    conexao.query(sql, callback);
};

export function buscarPorId(id, callback) {
    const sql = "SELECT p.*, c.nome AS categoria_nome FROM produtos p LEFT JOIN categorias c ON p.categoria_id = c.id WHERE p.id = ?";
    conexao.query(sql, [id], callback);
};

export function criar(dados, callback) {
    const sql = "INSERT INTO produtos (nome, descricao, preco, quantidade_estoque, categoria_id) VALUES (?, ?, ?, ?, ?)";
    conexao.query(sql, [dados.nome, dados.descricao, dados.preco, dados.quantidade_estoque, dados.categoria_id], callback);
};

export function atualizar(id, dados, callback) {
    const sql = "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade_estoque = ?, categoria_id = ? WHERE id = ?";
    conexao.query(sql, [dados.nome, dados.descricao, dados.preco, dados.quantidade_estoque, dados.categoria_id, id], callback);
};

export function atualizarEstoque(id, novaQuantidade, callback) {
    const sql = "UPDATE produtos SET quantidade_estoque = ? WHERE id = ?";
    conexao.query(sql, [novaQuantidade, id], callback);
};

export function excluir(id, callback) {
    const sql = "DELETE FROM produtos WHERE id = ?";
    conexao.query(sql, [id], callback);
};