import { Request, Response, NextFunction } from 'express';
import { pool } from '../app';

export async function getPedidos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [rows] = await pool.query('SELECT * FROM pedidos');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function createPedido(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { numero_pedido, valor_pedido, forma_pagamento, taxa_entrega, id_cliente, id_estado, id_endereco } = req.body;
    const [result] = await pool.query('INSERT INTO pedidos (numero_pedido, valor_pedido, forma_pagamento, taxa_entrega, id_cliente, id_estado, id_endereco) VALUES (?, ?, ?, ?, ?, ?, ?)', [numero_pedido, valor_pedido, forma_pagamento, taxa_entrega, id_cliente, id_estado, id_endereco]);
    res.status(201).json({ idpedidos: (result as any).insertId, numero_pedido, valor_pedido, forma_pagamento, taxa_entrega, id_cliente, id_estado, id_endereco });
  } catch (error) {
    next(error);
  }
}

export async function updatePedido(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idpedidos } = req.params;
    const { numero_pedido, valor_pedido, forma_pagamento, taxa_entrega, id_cliente, id_estado, id_endereco } = req.body;
    await pool.query('UPDATE pedidos SET numero_pedido = ?, valor_pedido = ?, forma_pagamento = ?, taxa_entrega = ?, id_cliente = ?, id_estado = ?, id_endereco = ? WHERE idpedidos = ?', [numero_pedido, valor_pedido, forma_pagamento, taxa_entrega, id_cliente, id_estado, id_endereco, idpedidos]);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

export async function deletePedido(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idpedidos } = req.params;
    await pool.query('DELETE FROM pedidos WHERE idpedidos = ?', [idpedidos]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
