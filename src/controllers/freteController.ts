import { Request, Response, NextFunction } from 'express';
import { pool } from '../app';

export async function getFretes(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [rows] = await pool.query('SELECT * FROM frete');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function createFrete(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { cep_inicio, cep_fim, valor_frete } = req.body;
    const [result] = await pool.query('INSERT INTO frete (cep_inicio, cep_fim, valor_frete) VALUES (?, ?, ?)', [cep_inicio, cep_fim, valor_frete]);
    res.status(201).json({ id: (result as any).insertId, cep_inicio, cep_fim, valor_frete });
  } catch (error) {
    next(error);
  }
}

export async function updateFrete(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { cep_inicio, cep_fim, valor_frete } = req.body;
    await pool.query('UPDATE frete SET cep_inicio = ?, cep_fim = ?, valor_frete = ? WHERE id = ?', [cep_inicio, cep_fim, valor_frete, id]);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

export async function deleteFrete(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM frete WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
