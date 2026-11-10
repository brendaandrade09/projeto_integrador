import {Router} from "express";
import * as pedidoController from "../controllers/pedidoController.js";
import validarId from "../middlewares/validarId.js";
const router = Router();

router.get("/pedidos", pedidoController.listar);

router.get("/pedidos:id", validarId, pedidoController.buscarPorId);

router.post("/pedidos", pedidoController.criar);

router.put("/:id", validarId, pedidoController.atualizar);
router.delete("/:id", validarId, pedidoController.excluir);

export default router;