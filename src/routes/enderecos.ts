import { Router } from 'express';
import { getEnderecos, createEndereco, updateEndereco, deleteEndereco } from '../controllers/enderecoController';

const router = Router();

router.get('/', getEnderecos);
router.post('/', createEndereco);
router.put('/:idendereco', updateEndereco);
router.delete('/:idendereco', deleteEndereco);

export default router;
