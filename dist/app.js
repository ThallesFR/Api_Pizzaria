"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const promise_1 = require("mysql2/promise");
const clientes_1 = __importDefault(require("./routes/clientes"));
const enderecos_1 = __importDefault(require("./routes/enderecos"));
const cartoes_1 = __importDefault(require("./routes/cartoes"));
const estadoPedidos_1 = __importDefault(require("./routes/estadoPedidos"));
const pedidos_1 = __importDefault(require("./routes/pedidos"));
const pedidosFinalizados_1 = __importDefault(require("./routes/pedidosFinalizados"));
const categoriasProdutos_1 = __importDefault(require("./routes/categoriasProdutos"));
const produtos_1 = __importDefault(require("./routes/produtos"));
const fretes_1 = __importDefault(require("./routes/fretes"));
const pedidosProdutos_1 = __importDefault(require("./routes/pedidosProdutos"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const dbConfig = {
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'pizzaria',
};
exports.pool = (0, promise_1.createPool)(dbConfig);
app.use(express_1.default.json());
app.use('/clientes', clientes_1.default);
app.use('/enderecos', enderecos_1.default);
app.use('/cartoes', cartoes_1.default);
app.use('/estado-pedidos', estadoPedidos_1.default);
app.use('/pedidos', pedidos_1.default);
app.use('/pedidos-finalizados', pedidosFinalizados_1.default);
app.use('/categorias-produtos', categoriasProdutos_1.default);
app.use('/produtos', produtos_1.default);
app.use('/fretes', fretes_1.default);
app.use('/pedidos-produtos', pedidosProdutos_1.default);
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
