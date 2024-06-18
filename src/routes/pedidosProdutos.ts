import { Router } from 'express';
import { getPedidosProdutos, createPedidoProduto, updatePedidoProduto, deletePedidoProduto } from '../controllers/pedidoProdutoController';

const router = Router();

router.get('/', getPedidosProdutos);
router.post('/', createPedidoProduto);
router.put('/:id', updatePedidoProduto);
router.delete('/:id', deletePedidoProduto);

export default router;
