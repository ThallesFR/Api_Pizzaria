import { Router } from 'express';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../controllers/clienteController';

const router = Router();

router.get('/:idcliente', getClientes);
router.post('/', createCliente);
router.put('/:idcliente', updateCliente);
router.delete('/:idcliente', deleteCliente);

export default router;
