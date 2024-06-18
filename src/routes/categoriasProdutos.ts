import { Router } from 'express';
import { getCategoriasProdutos, createCategoriaProduto, updateCategoriaProduto, deleteCategoriaProduto } from '../controllers/categoriaProdutoController';

const router = Router();

router.get('/', getCategoriasProdutos);
router.post('/', createCategoriaProduto);
router.put('/:id', updateCategoriaProduto);
router.delete('/:id', deleteCategoriaProduto);

export default router;
