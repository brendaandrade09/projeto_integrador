import {Router} from "express";
import * as categoriaController from "../controllers/categoriaController.js";
import validarId from "../middlewares/validarId.js";
const router = Router();

router.get("/categorias", categoriaController.listar);

router.get("/:id", validarId, categoriaController.buscarPorId);

router.post("/categorias", categoriaController.criar);

router.put("/:id", validarId, categoriaController.atualizar);

router.delete("/:id", validarId, categoriaController.excluir);

export default router;