import conexao from "../../db.js";

export function listarPorPedido(pedidoId, callback) {
    const sql = "SELECT ip.*, p.nome AS produto_nome, p.preco FROM itens_pedido ip JOIN produtos p ON ip.produto_id = p.id WHERE ip.pedido_id = ?";
    conexao.query(sql, [pedidoId], callback);
};

export function criar(dados, callback) {
    const sql = "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)";
    conexao.query(sql, [dados.pedido_id, dados.produto_id, dados.quantidade, dados.preco_unitario], callback);
};

export function atualizar(id, dados, callback) {
    const sql = "UPDATE itens_pedido SET quantidade = ?, preco_unitario = ? WHERE id = ?";
    conexao.query(sql, [dados.quantidade, dados.preco_unitario, id], callback);
};

export function excluir(id, callback) {
    const sql = "DELETE FROM itens_pedido WHERE id = ?";
    conexao.query(sql, [id], callback);
};