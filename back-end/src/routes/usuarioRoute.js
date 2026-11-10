import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";
import validarId from "../middlewares/validarId.js";
const router = Router();

router.get("/usuarios", usuarioController.listar);

router.get("/usuarios/:id", validarId, usuarioController.buscarPorId);

router.post("/usuarios", usuarioController.criar);

router.put("/usuarios/:id", validarId, usuarioController.atualizar);

router.delete("/usuarios/:id", validarId, usuarioController.excluir);

export default router;