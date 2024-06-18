"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: 'An internal server error occurred.' });
}
exports.default = errorHandler;
