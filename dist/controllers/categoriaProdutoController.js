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
exports.deleteCategoriaProduto = exports.updateCategoriaProduto = exports.createCategoriaProduto = exports.getCategoriasProdutos = void 0;
const app_1 = require("../app");
function getCategoriasProdutos(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield app_1.pool.query('SELECT * FROM categoria_produto');
            res.json(rows);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getCategoriasProdutos = getCategoriasProdutos;
function createCategoriaProduto(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { nome } = req.body;
            const [result] = yield app_1.pool.query('INSERT INTO categoria_produto (nome) VALUES (?)', [nome]);
            res.status(201).json({ id: result.insertId, nome });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createCategoriaProduto = createCategoriaProduto;
function updateCategoriaProduto(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            yield app_1.pool.query('UPDATE categoria_produto SET nome = ? WHERE id = ?', [nome, id]);
            res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateCategoriaProduto = updateCategoriaProduto;
function deleteCategoriaProduto(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield app_1.pool.query('DELETE FROM categoria_produto WHERE id = ?', [id]);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteCategoriaProduto = deleteCategoriaProduto;
