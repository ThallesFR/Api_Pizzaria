import express from 'express';
import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';
import clienteRoutes from './routes/clientes';
import enderecoRoutes from './routes/enderecos';
import cartaoRoutes from './routes/cartoes';
import estadoPedidoRoutes from './routes/estadoPedidos';
import pedidoRoutes from './routes/pedidos';
import pedidoFinalizadoRoutes from './routes/pedidosFinalizados';
import categoriaProdutoRoutes from './routes/categoriasProdutos';
import produtoRoutes from './routes/produtos';
import freteRoutes from './routes/fretes';
import pedidoProdutoRoutes from './routes/pedidosProdutos';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'pizzaria',
};

export const pool = createPool(dbConfig);

app.use(express.json());

app.use('/clientes', clienteRoutes);
app.use('/enderecos', enderecoRoutes);
app.use('/cartoes', cartaoRoutes);
app.use('/estado-pedidos', estadoPedidoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/pedidos-finalizados', pedidoFinalizadoRoutes);
app.use('/categorias-produtos', categoriaProdutoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/fretes', freteRoutes);
app.use('/pedidos-produtos', pedidoProdutoRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
