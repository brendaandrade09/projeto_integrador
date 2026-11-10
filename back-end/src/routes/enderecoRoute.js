import { Router } from "express";
import * as enderecoController from "../controllers/enderecoController.js";
import validarId from "../middlewares/validarId.js";
const router = Router();

router.get("/enderecos", enderecoController.listar);

router.get("/:id", validarId, enderecoController.buscarPorId);

router.post("/enderecos", enderecoController.criar);

router.put("/:id", validarId, enderecoController.atualizar);

router.delete("/:id", validarId, enderecoController.excluir);

export default router;