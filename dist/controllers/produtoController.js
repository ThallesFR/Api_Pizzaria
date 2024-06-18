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
exports.deleteProduto = exports.updateProduto = exports.createProduto = exports.getProdutos = void 0;
const app_1 = require("../app");
function getProdutos(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield app_1.pool.query('SELECT * FROM produtos');
            res.json(rows);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getProdutos = getProdutos;
function createProduto(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nome, descricao, preco, id_categoria } = req.body;
            const [result] = yield app_1.pool.query('INSERT INTO produtos (nome, descricao, preco, id_categoria) VALUES (?, ?, ?, ?)', [nome, descricao, preco, id_categoria]);
            res.status(201).json({ id: result.insertId, nome, descricao, preco, id_categoria });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createProduto = createProduto;
function updateProduto(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { nome, descricao, preco, id_categoria } = req.body;
            yield app_1.pool.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, id_categoria = ? WHERE id = ?', [nome, descricao, preco, id_categoria, id]);
            res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateProduto = updateProduto;
function deleteProduto(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield app_1.pool.query('DELETE FROM produtos WHERE id = ?', [id]);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteProduto = deleteProduto;
