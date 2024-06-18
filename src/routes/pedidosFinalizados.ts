import { Router } from 'express';
import { getPedidosFinalizados, createPedidoFinalizado, updatePedidoFinalizado, deletePedidoFinalizado } from '../controllers/pedidoFinalizadoController';

const router = Router();

router.get('/', getPedidosFinalizados);
router.post('/', createPedidoFinalizado);
router.put('/:idpedidos', updatePedidoFinalizado);
router.delete('/:idpedidos', deletePedidoFinalizado);

export default router;
