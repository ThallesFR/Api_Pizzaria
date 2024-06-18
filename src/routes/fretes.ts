import { Router } from 'express';
import { getFretes, createFrete, updateFrete, deleteFrete } from '../controllers/freteController';

const router = Router();

router.get('/', getFretes);
router.post('/', createFrete);
router.put('/:id', updateFrete);
router.delete('/:id', deleteFrete);

export default router;
