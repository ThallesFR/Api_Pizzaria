import { Request, Response, NextFunction } from 'express';
import { pool } from '../app';

export async function getClientes(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idcliente } = req.params;  // Obter o idcliente dos parâmetros da requisição
    const [rows] = await pool.query('SELECT * FROM cliente WHERE idcliente = ?', [idcliente]);
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function createCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { nome, data_nasci, cpf, email, senha, telefone } = req.body;
    const [result] = await pool.query('INSERT INTO cliente (nome, data_nasci, cpf, email, senha, telefone) VALUES (?, ?, ?, ?, ?, ?)', [nome, data_nasci, cpf, email, senha, telefone]);
    res.status(201).json({ idcliente: (result as any).insertId, nome, data_nasci, cpf, email, senha, telefone });
  } catch (error) {
    next(error);
  }
}

export async function updateCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idcliente } = req.params;
    const { nome, data_nasci, cpf, email, senha, telefone } = req.body;
    await pool.query('UPDATE cliente SET nome = ?, data_nasci = ?, cpf = ?, email = ?, senha = ?, telefone = ? WHERE idcliente = ?', [nome, data_nasci, cpf, email, senha, telefone, idcliente]);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
}

export async function deleteCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idcliente } = req.params;
    await pool.query('DELETE FROM cliente WHERE idcliente = ?', [idcliente]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
