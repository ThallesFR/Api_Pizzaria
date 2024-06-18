import { Router } from 'express';
import { getPedidos, createPedido, updatePedido, deletePedido } from '../controllers/pedidoController';

const router = Router();

router.get('/', getPedidos);
router.post('/', createPedido);
router.put('/:idpedidos', updatePedido);
router.delete('/:idpedidos', deletePedido);

export default router;
