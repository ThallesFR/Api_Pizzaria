import { Request, Response, NextFunction } from 'express';
import { pool } from '../app';

export async function getPedidosProdutos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [rows] = await pool.query('SELECT * FROM pedidos_produtos');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function createPedidoProduto(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id_produto, id_pedido, quantidade, valor_total } = req.body;
    const [result] = await pool.query('INSERT INTO pedidos_produtos (id_produto, id_pedido, quantidade, valor_total) VALUES (?, ?, ?, ?)', [id_produto, id_pedido, quantidade, valor_total]);
    res.status(201).json({ id: (result as any).insertId, id_produto, id_pedido, quantidade, valor_total });
  } catch (error) {
    next(error);
  }
}

export async function updatePedidoProduto(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { id_produto, id_pedido, quantidade, valor_total } = req.body;
    await pool.query('UPDATE pedidos_produtos SET id_produto = ?, id_pedido = ?, quantidade = ?, valor_total = ? WHERE id = ?', [id_produto, id_pedido, quantidade, valor_total, id]);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

export async function deletePedidoProduto(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM pedidos_produtos WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
