import { Request, Response, NextFunction } from 'express';
import { pool } from '../app';

export async function getEstadoPedidos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [rows] = await pool.query('SELECT * FROM estado_pedido');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function createEstadoPedido(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { tipo_estado } = req.body;
    const [result] = await pool.query('INSERT INTO estado_pedido (tipo_estado) VALUES (?)', [tipo_estado]);
    res.status(201).json({ idestados: (result as any).insertId, tipo_estado });
  } catch (error) {
    next(error);
  }
}

export async function updateEstadoPedido(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idestados } = req.params;
    const { tipo_estado } = req.body;
    await pool.query('UPDATE estado_pedido SET tipo_estado = ? WHERE idestados = ?', [tipo_estado, idestados]);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

export async function deleteEstadoPedido(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idestados } = req.params;
    await pool.query('DELETE FROM estado_pedido WHERE idestados = ?', [idestados]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
