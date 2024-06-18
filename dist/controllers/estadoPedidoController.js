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
exports.deleteEstadoPedido = exports.updateEstadoPedido = exports.createEstadoPedido = exports.getEstadoPedidos = void 0;
const app_1 = require("../app");
function getEstadoPedidos(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield app_1.pool.query('SELECT * FROM estado_pedido');
            res.json(rows);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getEstadoPedidos = getEstadoPedidos;
function createEstadoPedido(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { tipo_estado } = req.body;
            const [result] = yield app_1.pool.query('INSERT INTO estado_pedido (tipo_estado) VALUES (?)', [tipo_estado]);
            res.status(201).json({ idestados: result.insertId, tipo_estado });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createEstadoPedido = createEstadoPedido;
function updateEstadoPedido(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idestados } = req.params;
            const { tipo_estado } = req.body;
            yield app_1.pool.query('UPDATE estado_pedido SET tipo_estado = ? WHERE idestados = ?', [tipo_estado, idestados]);
            res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateEstadoPedido = updateEstadoPedido;
function deleteEstadoPedido(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { idestados } = req.params;
            yield app_1.pool.query('DELETE FROM estado_pedido WHERE idestados = ?', [idestados]);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteEstadoPedido = deleteEstadoPedido;
