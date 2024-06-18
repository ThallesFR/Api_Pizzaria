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
exports.deleteCartao = exports.updateCartao = exports.createCartao = exports.getCartoes = void 0;
const app_1 = require("../app");
function getCartoes(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield app_1.pool.query('SELECT * FROM cartoes');
            res.json(rows);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getCartoes = getCartoes;
function createCartao(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id_cliente, token } = req.body;
            const [result] = yield app_1.pool.query('INSERT INTO cartoes (id_cliente, token) VALUES (?, ?)', [id_cliente, token]);
            res.status(201).json({ idcartoes: result.insertId, id_cliente, token });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createCartao = createCartao;
function updateCartao(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idcartoes } = req.params;
            const { id_cliente, token } = req.body;
            yield app_1.pool.query('UPDATE cartoes SET id_cliente = ?, token = ? WHERE idcartoes = ?', [id_cliente, token, idcartoes]);
            res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateCartao = updateCartao;
function deleteCartao(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idcartoes } = req.params;
            yield app_1.pool.query('DELETE FROM cartoes WHERE idcartoes = ?', [idcartoes]);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteCartao = deleteCartao;
