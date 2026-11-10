import * as itemPedidoModel from "../models/itemPedidoModel.js";
import { textoValido } from "../utils/validacoes.js";
import { inteiroPositivo } from "../utils/validacoes.js";
export function listar(req, res, next) {
    itemPedidoModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
};

// 1. Função listar (usada em router.get("/"))
export async function listar(req, res, next) {
    try {
        const sql = "SELECT ip.*, p.nome AS produto_nome, p.preco FROM itens_pedido ip JOIN produtos p ON ip.produto_id = p.id";
        const [rows] = await conexao.query(sql);
        res.json(rows);
    } catch (error) {
        next(error);
    }
}

// 2. Função buscarPorId (usada em router.get("/:id"))
export async function buscarPorId(req, res, next) {
    try {
        const { id } = req.params;
        const sql = "SELECT ip.*, p.nome AS produto_nome, p.preco FROM itens_pedido ip JOIN produtos p ON ip.produto_id = p.id WHERE ip.id = ?";
        const [rows] = await conexao.query(sql, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ mensagem: "Item de pedido não encontrado." });
        }
        res.json(rows[0]);
    } catch (error) {
        next(error);
    }
}

// 3. Função criar (usada em router.post("/"))
export async function criar(req, res, next) {
    try {
        const { pedido_id, produto_id, quantidade, preco_unitario } = req.body;
        const sql = "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)";
        const [result] = await conexao.query(sql, [pedido_id, produto_id, quantidade, preco_unitario]);
        res.status(201).json({ mensagem: "Item criado com sucesso!", id: Number(result.insertId) });
    } catch (error) {
        next(error);
    }
}

// 4. Função atualizar (usada em router.put("/:id"))
export async function atualizar(req, res, next) {
    try {
        const { id } = req.params;
        const { quantidade, preco_unitario } = req.body;
        const sql = "UPDATE itens_pedido SET quantidade = ?, preco_unitario = ? WHERE id = ?";
        const [result] = await conexao.query(sql, [quantidade, preco_unitario, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Item de pedido não encontrado." });
        }
        res.json({ mensagem: "Item atualizado com sucesso!" });
    } catch (error) {
        next(error);
    }
}

// 5. Função excluir (usada em router.delete("/:id"))
export async function excluir(req, res, next) {
    try {
        const { id } = req.params;
        const sql = "DELETE FROM itens_pedido WHERE id = ?";
        const [result] = await conexao.query(sql, [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ mensagem: "Item de pedido não encontrado." });
        }
        res.json({ mensagem: "Item excluído com sucesso!" });
    } catch (error) {
        next(error);
    }
}
