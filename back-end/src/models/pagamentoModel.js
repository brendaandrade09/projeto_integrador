import conexao from "../db.js";

export function listar(callback) {
    const sql = "SELECT * FROM pagamentos ORDER BY id DESC";
    conexao.query(sql, callback);
};

export function buscarPorPedido(pedidoId, callback) {
    const sql = "SELECT * FROM pagamentos WHERE pedido_id = ?";
    conexao.query(sql, [pedidoId], callback);
};

export function criar(dados, callback) {
    const sql = "INSERT INTO pagamentos (pedido_id, metodo_pagamento, status_pagamento, valor) VALUES (?, ?, ?, ?)";
    conexao.query(sql, [dados.pedido_id, dados.metodo_pagamento, dados.status_pagamento || 'pendente', dados.valor], callback);
};

export function atualizarStatus(id, status, callback) {
    const sql = "UPDATE pagamentos SET status_pagamento = ? WHERE id = ?";
    conexao.query(sql, [status, id], callback);
};

export function excluir(id, callback) {
    const sql = "DELETE FROM pagamentos WHERE id = ?";
    conexao.query(sql, [id], callback);
};