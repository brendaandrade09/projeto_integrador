import conexao from "../../db.js";

export async function listar(req, res, next) {
    try {
        const [rows] = await conexao.query("SELECT * FROM pagamentos");
        res.json(rows);
    } catch (error) {
        next(error);
    }
}

export async function buscarPorId(req, res, next) {
    try {
        const { id } = req.params;
        const [rows] = await conexao.query("SELECT * FROM pagamentos WHERE id = ?", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensagem: "Pagamento não encontrado." });
        }
        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
}

export async function criar(req, res, next) {
    try {
        const { pedido_id, forma_pagamento, valor, status } = req.body;
        const sql = "INSERT INTO pagamentos (pedido_id, forma_pagamento, valor, status) VALUES (?, ?, ?, ?)";
        const [result] = await conexao.query(sql, [pedido_id, forma_pagamento, valor, status]);
        res.status(201).json({ mensagem: "Pagamento registado com sucesso!", id: Number(result.insertId) });
    } catch (error) {
        next(error);
    }
}

export async function atualizar(req, res, next) {
    try {
        const { id } = req.params;
        const { forma_pagamento, valor, status } = req.body;
        const sql = "UPDATE pagamentos SET forma_pagamento = ?, valor = ?, status = ? WHERE id = ?";
        const [result] = await conexao.query(sql, [forma_pagamento, valor, status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Pagamento não encontrado." });
        }
        res.json({ mensagem: "Pagamento atualizado com sucesso!" });
    } catch (error) {
        next(error);
    }
}

export async function excluir(req, res, next) {
    try {
        const { id } = req.params;
        const [result] = await conexao.query("DELETE FROM pagamentos WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Pagamento não encontrado." });
        }
        res.json({ mensagem: "Pagamento eliminado com sucesso!" });
    } catch (error) {
        next(error);
    }
}
