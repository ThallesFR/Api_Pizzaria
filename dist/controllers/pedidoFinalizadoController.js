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
exports.deletePedidoFinalizado = exports.updatePedidoFinalizado = exports.createPedidoFinalizado = exports.getPedidosFinalizados = void 0;
const app_1 = require("../app");
function getPedidosFinalizados(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield app_1.pool.query('SELECT * FROM pedidos_finalizados');
            res.json(rows);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getPedidosFinalizados = getPedidosFinalizados;
function createPedidoFinalizado(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { numero_pedido, valor_pedido, forma_pagamento, taxa_entrega, id_cliente, id_estado, id_endereco } = req.body;
            const [result] = yield app_1.pool.query('INSERT INTO pedidos_finalizados (numero_pedido, valor_pedido, forma_pagamento, taxa_entrega, id_cliente, id_estado, id_endereco) VALUES (?, ?, ?, ?, ?, ?, ?)', [numero_pedido, valor_pedido, forma_pagamento, taxa_entrega, id_cliente, id_estado, id_endereco]);
            res.status(201).json({ idpedidos: result.insertId, numero_pedido, valor_pedido, forma_pagamento, taxa_entrega, id_cliente, id_estado, id_endereco });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createPedidoFinalizado = createPedidoFinalizado;
function updatePedidoFinalizado(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idpedidos } = req.params;
            const { numero_pedido, valor_pedido, forma_pagamento, taxa_entrega, id_cliente, id_estado, id_endereco } = req.body;
            yield app_1.pool.query('UPDATE pedidos_finalizados SET numero_pedido = ?, valor_pedido = ?, forma_pagamento = ?, taxa_entrega = ?, id_cliente = ?, id_estado = ?, id_endereco = ? WHERE idpedidos = ?', [numero_pedido, valor_pedido, forma_pagamento, taxa_entrega, id_cliente, id_estado, id_endereco, idpedidos]);
            res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updatePedidoFinalizado = updatePedidoFinalizado;
function deletePedidoFinalizado(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idpedidos } = req.params;
            yield app_1.pool.query('DELETE FROM pedidos_finalizados WHERE idpedidos = ?', [idpedidos]);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deletePedidoFinalizado = deletePedidoFinalizado;
