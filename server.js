require('dotenv').config();
const express = require('express');
const cors    = require('cors');

// ─── Middlewares Customizados ─────────────────────────────────
const logger       = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// ─── Rotas ────────────────────────────────────────────────────
const produtosRoutes   = require('./routes/produtos');
const categoriasRoutes = require('./routes/categorias');
const pedidosRoutes    = require('./routes/pedidos');

// ─── Criação da Aplicação Express ────────────────────────────
const app = express();

// ─── Middlewares Globais ──────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(logger); // vem após os middlewares do Express, mas antes das rotas

// ─── Rota de Boas-Vindas / Health Check ──────────────────────
app.get('/', (_req, res) => {
  res.json({ mensagem: '💪 Bem-vindo à API de Suplementos!' });
});

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ─── Registro das Rotas ───────────────────────────────────────
app.use('/api/produtos',   produtosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/pedidos',    pedidosRoutes);

// ─────────────────────────────────────────────────────────────
// Rota não encontrada (404) — DEVE vir depois de todas as rotas
// ─────────────────────────────────────────────────────────────
app.use((req, res, _next) => {
  res.status(404).json({
    sucesso: false,
    mensagem: `Rota '${req.url}' não encontrada na API de Suplementos.`,
  });
});

// ─────────────────────────────────────────────────────────────
// Middleware de Erros Global — DEVE ser o último middleware
// ─────────────────────────────────────────────────────────────
app.use(errorHandler);

// ─────────────────────────────────────────────────────────────
// Iniciando o Servidor
// ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('');
  console.log('💪 ================================');
  console.log('💪 Suplementos API rodando!');
  console.log(`💪 Porta local: ${PORT}`);
  console.log('💪 ================================');
  console.log('');
  console.log('📋 Rotas disponíveis:');
  console.log(`   GET    /health`);
  console.log(`   GET    /api/produtos`);
  console.log(`   GET    /api/produtos/:id`);
  console.log(`   POST   /api/produtos`);
  console.log(`   PUT    /api/produtos/:id`);
  console.log(`   DELETE /api/produtos/:id`);
  console.log(`   GET    /api/categorias`);
  console.log(`   POST   /api/categorias`);
  console.log(`   GET    /api/pedidos`);
  console.log(`   POST   /api/pedidos`);
  console.log('');
});

module.exports = app;
