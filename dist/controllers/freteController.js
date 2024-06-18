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
exports.deleteFrete = exports.updateFrete = exports.createFrete = exports.getFretes = void 0;
const app_1 = require("../app");
function getFretes(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [rows] = yield app_1.pool.query('SELECT * FROM frete');
            res.json(rows);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getFretes = getFretes;
function createFrete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { cep_inicio, cep_fim, valor_frete } = req.body;
            const [result] = yield app_1.pool.query('INSERT INTO frete (cep_inicio, cep_fim, valor_frete) VALUES (?, ?, ?)', [cep_inicio, cep_fim, valor_frete]);
            res.status(201).json({ id: result.insertId, cep_inicio, cep_fim, valor_frete });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createFrete = createFrete;
function updateFrete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { cep_inicio, cep_fim, valor_frete } = req.body;
            yield app_1.pool.query('UPDATE frete SET cep_inicio = ?, cep_fim = ?, valor_frete = ? WHERE id = ?', [cep_inicio, cep_fim, valor_frete, id]);
            res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateFrete = updateFrete;
function deleteFrete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield app_1.pool.query('DELETE FROM frete WHERE id = ?', [id]);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteFrete = deleteFrete;
