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
exports.deletePedidoProduto = exports.updatePedidoProduto = exports.createPedidoProduto = exports.getPedidosProdutos = void 0;
const app_1 = require("../app");
function getPedidosProdutos(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield app_1.pool.query('SELECT * FROM pedidos_produtos');
            res.json(rows);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getPedidosProdutos = getPedidosProdutos;
function createPedidoProduto(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id_produto, id_pedido, quantidade, valor_total } = req.body;
            const [result] = yield app_1.pool.query('INSERT INTO pedidos_produtos (id_produto, id_pedido, quantidade, valor_total) VALUES (?, ?, ?, ?)', [id_produto, id_pedido, quantidade, valor_total]);
            res.status(201).json({ id: result.insertId, id_produto, id_pedido, quantidade, valor_total });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createPedidoProduto = createPedidoProduto;
function updatePedidoProduto(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { id_produto, id_pedido, quantidade, valor_total } = req.body;
            yield app_1.pool.query('UPDATE pedidos_produtos SET id_produto = ?, id_pedido = ?, quantidade = ?, valor_total = ? WHERE id = ?', [id_produto, id_pedido, quantidade, valor_total, id]);
            res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updatePedidoProduto = updatePedidoProduto;
function deletePedidoProduto(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield app_1.pool.query('DELETE FROM pedidos_produtos WHERE id = ?', [id]);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deletePedidoProduto = deletePedidoProduto;
