import conexao from "../../db.js";

export function listar(callback) {
    const sql = "SELECT p.*, u.nome AS usuario_nome FROM pedidos p JOIN usuarios u ON p.usuario_id = u.id ORDER BY p.id DESC";
    conexao.query(sql, callback);
};

export function buscarPorId(id, callback) {
    const sql = "SELECT p.*, u.nome AS usuario_nome FROM pedidos p JOIN usuarios u ON p.usuario_id = u.id WHERE p.id = ?";
    conexao.query(sql, [id], callback);
};

export function listarPorUsuario(usuarioId, callback) {
    const sql = "SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY data_pedido DESC";
    conexao.query(sql, [usuarioId], callback);
};

export function criar(dados, callback) {
    const sql = "INSERT INTO pedidos (usuario_id, valor_total, status) VALUES (?, ?, ?)";
    conexao.query(sql, [dados.usuario_id, dados.valor_total, dados.status || 'pendente'], callback);
};

export function atualizarStatus(id, status, callback) {
    const sql = "UPDATE pedidos SET status = ? WHERE id = ?";
    conexao.query(sql, [status, id], callback);
};

export function excluir(id, callback) {
    const sql = "DELETE FROM pedidos WHERE id = ?";
    conexao.query(sql, [id], callback);
};