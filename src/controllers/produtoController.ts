import { Request, Response, NextFunction } from 'express';
import { pool } from '../app';

export async function getProdutos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [rows] = await pool.query('SELECT * FROM produtos');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function createProduto(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { nome, descricao, preco, id_categoria } = req.body;
    const [result] = await pool.query('INSERT INTO produtos (nome, descricao, preco, id_categoria) VALUES (?, ?, ?, ?)', [nome, descricao, preco, id_categoria]);
    res.status(201).json({ id: (result as any).insertId, nome, descricao, preco, id_categoria });
  } catch (error) {
    next(error);
  }
}

export async function updateProduto(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { nome, descricao, preco, id_categoria } = req.body;
    await pool.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, id_categoria = ? WHERE id = ?', [nome, descricao, preco, id_categoria, id]);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

export async function deleteProduto(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
