import { Router } from 'express';
import { getEstadoPedidos, createEstadoPedido, updateEstadoPedido, deleteEstadoPedido } from '../controllers/estadoPedidoController';

const router = Router();

router.get('/', getEstadoPedidos);
router.post('/', createEstadoPedido);
router.put('/:idestados', updateEstadoPedido);
router.delete('/:idestados', deleteEstadoPedido);

export default router;
