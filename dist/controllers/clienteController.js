"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getClientes = void 0;
const app_1 = require("../app");
function getClientes(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idcliente } = req.params; // Obter o idcliente dos parâmetros da requisição
            const [rows] = yield app_1.pool.query('SELECT * FROM cliente WHERE idcliente = ?', [idcliente]);
            res.json(rows);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getClientes = getClientes;
function createCliente(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nome, data_nasci, cpf, email, senha, telefone } = req.body;
            const [result] = yield app_1.pool.query('INSERT INTO cliente (nome, data_nasci, cpf, email, senha, telefone) VALUES (?, ?, ?, ?, ?, ?)', [nome, data_nasci, cpf, email, senha, telefone]);
            res.status(201).json({ idcliente: result.insertId, nome, data_nasci, cpf, email, senha, telefone });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createCliente = createCliente;
function updateCliente(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idcliente } = req.params;
            const { nome, data_nasci, cpf, email, senha, telefone } = req.body;
            yield app_1.pool.query('UPDATE cliente SET nome = ?, data_nasci = ?, cpf = ?, email = ?, senha = ?, telefone = ? WHERE idcliente = ?', [nome, data_nasci, cpf, email, senha, telefone, idcliente]);
            res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateCliente = updateCliente;
function deleteCliente(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idcliente } = req.params;
            yield app_1.pool.query('DELETE FROM cliente WHERE idcliente = ?', [idcliente]);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteCliente = deleteCliente;
