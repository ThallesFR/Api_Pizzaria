import { Router } from 'express';
import { getCartoes, createCartao, updateCartao, deleteCartao } from '../controllers/cartaoController';

const router = Router();

router.get('/', getCartoes);
router.post('/', createCartao);
router.put('/:idcartoes', updateCartao);
router.delete('/:idcartoes', deleteCartao);

export default router;
