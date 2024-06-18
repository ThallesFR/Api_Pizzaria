import { Request, Response, NextFunction } from 'express';
import { pool } from '../app';

export async function getEnderecos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [rows] = await pool.query('SELECT * FROM endereco');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function createEndereco(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { cep, uf, cidade, bairro, logradouro, numero, complemento, id_cliente } = req.body;
    const [result] = await pool.query('INSERT INTO endereco (cep, uf, cidade, bairro, logradouro, numero, complemento, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [cep, uf, cidade, bairro, logradouro, numero, complemento, id_cliente]);
    res.status(201).json({ idendereco: (result as any).insertId, cep, uf, cidade, bairro, logradouro, numero, complemento, id_cliente });
  } catch (error) {
    next(error);
  }
}

export async function updateEndereco(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idendereco } = req.params;
    const { cep, uf, cidade, bairro, logradouro, numero, complemento, id_cliente } = req.body;
    await pool.query('UPDATE endereco SET cep = ?, uf = ?, cidade = ?, bairro = ?, logradouro = ?, numero = ?, complemento = ?, id_cliente = ? WHERE idendereco = ?', [cep, uf, cidade, bairro, logradouro, numero, complemento, id_cliente, idendereco]);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

export async function deleteEndereco(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idendereco } = req.params;
    await pool.query('DELETE FROM endereco WHERE idendereco = ?', [idendereco]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
