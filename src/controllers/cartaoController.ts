import { Request, Response, NextFunction } from 'express';
import { pool } from '../app';

export async function getCartoes(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [rows] = await pool.query('SELECT * FROM cartoes');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function createCartao(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id_cliente, token } = req.body;
    const [result] = await pool.query('INSERT INTO cartoes (id_cliente, token) VALUES (?, ?)', [id_cliente, token]);
    res.status(201).json({ idcartoes: (result as any).insertId, id_cliente, token });
  } catch (error) {
    next(error);
  }
}

export async function updateCartao(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idcartoes } = req.params;
    const { id_cliente, token } = req.body;
    await pool.query('UPDATE cartoes SET id_cliente = ?, token = ? WHERE idcartoes = ?', [id_cliente, token, idcartoes]);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

export async function deleteCartao(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idcartoes } = req.params;
    await pool.query('DELETE FROM cartoes WHERE idcartoes = ?', [idcartoes]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
