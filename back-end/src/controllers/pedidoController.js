import conexao from "../../db.js";

export async function listar(req, res, next) {
    try {
        const [rows] = await conexao.query("SELECT * FROM pedidos");
        res.json(rows);
    } catch (error) {
        next(error);
    }
}

export async function buscarPorId(req, res, next) {
    try {
        const { id } = req.params;
        const [rows] = await conexao.query("SELECT * FROM pedidos WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensagem: "Pedido não encontrado." });
        }
        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
}

export async function criar(req, res, next) {
    try {
        const { usuario_id, data_pedido, status, total } = req.body;
        const sql = "INSERT INTO pedidos (usuario_id, data_pedido, status, total) VALUES (?, ?, ?, ?)";
        const [result] = await conexao.query(sql, [usuario_id, data_pedido, status, total]);
        res.status(201).json({ mensagem: "Pedido criado com sucesso!", id: Number(result.insertId) });
    } catch (error) {
        next(error);
    }
}

export async function atualizar(req, res, next) {
    try {
        const { id } = req.params;
        const { status, total } = req.body;
        const sql = "UPDATE pedidos SET status = ?, total = ? WHERE id = ?";
        const [result] = await conexao.query(sql, [status, total, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Pedido não encontrado." });
        }
        res.json({ mensagem: "Pedido atualizado com sucesso!" });
    } catch (error) {
        next(error);
    }
}

export async function excluir(req, res, next) {
    try {
        const { id } = req.params;
        const [result] = await conexao.query("DELETE FROM pedidos WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Pedido não encontrado." });
        }
        res.json({ mensagem: "Pedido excluído com sucesso!" });
    } catch (error) {
        next(error);
    }
}