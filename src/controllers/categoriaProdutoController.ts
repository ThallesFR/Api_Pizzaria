import { Request, Response, NextFunction } from 'express';
import { pool } from '../app';

export async function getCategoriasProdutos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [rows] = await pool.query('SELECT * FROM categoria_produto');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function createCategoriaProduto(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { nome } = req.body;
    const [result] = await pool.query('INSERT INTO categoria_produto (nome) VALUES (?)', [nome]);
    res.status(201).json({ id: (result as any).insertId, nome });
  } catch (error) {
    next(error);
  }
}

export async function updateCategoriaProduto(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    await pool.query('UPDATE categoria_produto SET nome = ? WHERE id = ?', [nome, id]);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

export async function deleteCategoriaProduto(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM categoria_produto WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
