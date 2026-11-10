import {Router} from "express";
// import * as produtoController from "../controllers/produtoController.js";
import validarId from "../middlewares/validarId.js";
const router = Router();

router.get("/produtos", produtoController.listar);

router.get("/produtos:id", validarId, produtoController.buscarPorId);

router.post("/produtos", produtoController.criar);

router.put("/produtos:id", validarId, produtoController.atualizar);

router.delete("/produtos:id", validarId, produtoController.excluir);

export default router;