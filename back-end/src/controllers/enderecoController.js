import * as enderecoModel from "../models/enderecoModel.js";
import { textoValido } from "../utils/validacoes.js";
import { inteiroPositivo } from "../utils/validacoes.js";
export function listar(req, res, next) {
    enderecoModel.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
};

export function buscarPorId(req, res, next) {
    enderecoModel.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Endereço não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
};

export function criar(req, res, next) {
    const { logradouro, numero, usuario_id } = req.body ?? {};
    if (!textoValido(logradouro, 150) || !inteiroPositivo(numero)
        || numero > 9999 || !inteiroPositivo(usuario_id)) {
        return res.status(400).json({
            erro: "Informe logradouro (até 150 caracteres), numero de 1 a 9999 e usuario_id inteiro positivo"
        });
    }
    const dados = { logradouro: logradouro.trim(), numero, usuario_id };

    enderecoModel.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Endereço cadastrado com sucesso",
            id: resultado.insertId
        });
    });
};

export function atualizar(req, res, next) {
    const { logradouro, numero, usuario_id } = req.body ?? {};
    if (!textoValido(logradouro, 150) || !inteiroPositivo(numero)
            || numero > 9999 || !inteiroPositivo(usuario_id)) {
            return res.status(400).json({
                erro: "Informe logradouro (até 150 caracteres), numero de 1 a 9999 e usuario_id inteiro positivo"
            });
        }
        const dados = { logradouro: logradouro.trim(), numero, usuario_id };

    // Consulta didática para confirmar que o registro existe antes de editar.
    enderecoModel.buscarPorId(req.id, (erro, registros) => {
        if (erro) return next(erro);
        if (registros.length === 0) {
            return res.status(404).json({ erro: "Endereço não encontrado" });
        }
        enderecoModel.atualizar(req.id, dados, (erro, resultado) => {
            if (erro) return next(erro);
            return res.status(200).json({ mensagem: "Endereço atualizado com sucesso" });
        });
    });
};

export function excluir(req, res, next) {
    enderecoModel.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Endereço não encontrado" });
        }
        return res.status(200).json({ mensagem: "Endereço excluído com sucesso" });
    });
};