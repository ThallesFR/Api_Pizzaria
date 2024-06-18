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
exports.deleteEndereco = exports.updateEndereco = exports.createEndereco = exports.getEnderecos = void 0;
const app_1 = require("../app");
function getEnderecos(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield app_1.pool.query('SELECT * FROM endereco');
            res.json(rows);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getEnderecos = getEnderecos;
function createEndereco(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { cep, uf, cidade, bairro, logradouro, numero, complemento, id_cliente } = req.body;
            const [result] = yield app_1.pool.query('INSERT INTO endereco (cep, uf, cidade, bairro, logradouro, numero, complemento, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [cep, uf, cidade, bairro, logradouro, numero, complemento, id_cliente]);
            res.status(201).json({ idendereco: result.insertId, cep, uf, cidade, bairro, logradouro, numero, complemento, id_cliente });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createEndereco = createEndereco;
function updateEndereco(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idendereco } = req.params;
            const { cep, uf, cidade, bairro, logradouro, numero, complemento, id_cliente } = req.body;
            yield app_1.pool.query('UPDATE endereco SET cep = ?, uf = ?, cidade = ?, bairro = ?, logradouro = ?, numero = ?, complemento = ?, id_cliente = ? WHERE idendereco = ?', [cep, uf, cidade, bairro, logradouro, numero, complemento, id_cliente, idendereco]);
            res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateEndereco = updateEndereco;
function deleteEndereco(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idendereco } = req.params;
            yield app_1.pool.query('DELETE FROM endereco WHERE idendereco = ?', [idendereco]);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteEndereco = deleteEndereco;
