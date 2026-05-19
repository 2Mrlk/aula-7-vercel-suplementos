
Copiar

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { createClient } = require('@supabase/supabase-js');
 
// ─── Middlewares Customizados ─────────────────────────────────
const logger       = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
 
// ─── Criação da Aplicação Express ────────────────────────────
const app = express();
 
// ─── Supabase ─────────────────────────────────────────────────
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
 
// ─── Middlewares Globais ──────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(logger); // vem após os middlewares do Express, mas antes das rotas
 
// ─── Rota de Boas-Vindas / Health Check ──────────────────────
app.get('/', (_req, res) => {
  res.json({ mensagem: '💪 Bem-vindo à API de Suplementos!' });
});
 
app.get('/health', (_req, res) => res.json({ status: 'ok' }));
 
// ─────────────────────────────────────────────────────────────
// CORREIO ELEGANTE
// ─────────────────────────────────────────────────────────────
 
// GET /correio  – lista os últimos 10 correios
app.get('/correio', async (_req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('correio_elegante')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
 
    if (error) return res.status(500).json({ sucesso: false, erro: error.message });
    res.json({ sucesso: true, dados: data });
  } catch (err) {
    next(err);
  }
});
 
// POST /correio  – cria um novo correio
app.post('/correio', async (req, res, next) => {
  try {
    const { from_name, to_name, message, theme, anonymous } = req.body;
 
    if (!to_name) {
      return res.status(400).json({ sucesso: false, erro: 'to_name é obrigatório' });
    }
 
    const { data, error } = await supabase
      .from('correio_elegante')
      .insert({
        from_name: anonymous ? null : (from_name || null),
        to_name,
        message: message || null,
        theme,
        anonymous,
      })
      .select()
      .single();
 
    if (error) return res.status(500).json({ sucesso: false, erro: error.message });
    res.status(201).json({ sucesso: true, dados: data });
  } catch (err) {
    next(err);
  }
});
 
// DELETE /correio/:id  – remove um correio
app.delete('/correio/:id', async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('correio_elegante')
      .delete()
      .eq('id', req.params.id);
 
    if (error) return res.status(500).json({ sucesso: false, erro: error.message });
    res.json({ sucesso: true, deletado: true });
  } catch (err) {
    next(err);
  }
});
 
// ─────────────────────────────────────────────────────────────
// PRODUTOS
// ─────────────────────────────────────────────────────────────
 
// GET /produtos  – lista todos os produtos
app.get('/produtos', async (_req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .order('destaque', { ascending: false })
      .order('created_at');
 
    if (error) return res.status(500).json({ sucesso: false, erro: error.message });
    res.json({ sucesso: true, dados: data });
  } catch (err) {
    next(err);
  }
});
 
// GET /produtos/:id  – busca um produto específico
app.get('/produtos/:id', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', req.params.id)
      .single();
 
    if (error) return res.status(404).json({ sucesso: false, erro: 'Produto não encontrado' });
    res.json({ sucesso: true, dados: data });
  } catch (err) {
    next(err);
  }
});
 
// POST /produtos  – cria um produto
app.post('/produtos', async (req, res, next) => {
  try {
    const { nome, descricao, preco, imagem_url, destaque } = req.body;
 
    if (!nome || preco == null) {
      return res.status(400).json({ sucesso: false, erro: 'nome e preco são obrigatórios' });
    }
 
    const { data, error } = await supabase
      .from('produtos')
      .insert({ nome, descricao, preco, imagem_url, destaque: !!destaque })
      .select()
      .single();
 
    if (error) return res.status(500).json({ sucesso: false, erro: error.message });
    res.status(201).json({ sucesso: true, dados: data });
  } catch (err) {
    next(err);
  }
});
 
// PUT /produtos/:id  – atualiza um produto
app.put('/produtos/:id', async (req, res, next) => {
  try {
    const { nome, descricao, preco, imagem_url, destaque } = req.body;
 
    const { data, error } = await supabase
      .from('produtos')
      .update({ nome, descricao, preco, imagem_url, destaque })
      .eq('id', req.params.id)
      .select()
      .single();
 
    if (error) return res.status(500).json({ sucesso: false, erro: error.message });
    res.json({ sucesso: true, dados: data });
  } catch (err) {
    next(err);
  }
});
 
// DELETE /produtos/:id  – remove um produto
app.delete('/produtos/:id', async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', req.params.id);
 
    if (error) return res.status(500).json({ sucesso: false, erro: error.message });
    res.json({ sucesso: true, deletado: true });
  } catch (err) {
    next(err);
  }
});
 
// ─────────────────────────────────────────────────────────────
// PEDIDOS
// ─────────────────────────────────────────────────────────────
 
// GET /pedidos  – lista todos os pedidos
app.get('/pedidos', async (_req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .order('created_at', { ascending: false });
 
    if (error) return res.status(500).json({ sucesso: false, erro: error.message });
    res.json({ sucesso: true, dados: data });
  } catch (err) {
    next(err);
  }
});
 
// POST /pedidos  – registra um pedido (adicionar ao carrinho)
app.post('/pedidos', async (req, res, next) => {
  try {
    const { produto_id, produto_nome, preco } = req.body;
 
    const { data, error } = await supabase
      .from('pedidos')
      .insert({ produto_id: produto_id || null, produto_nome, preco })
      .select()
      .single();
 
    if (error) return res.status(500).json({ sucesso: false, erro: error.message });
    res.status(201).json({ sucesso: true, dados: data });
  } catch (err) {
    next(err);
  }
});
 
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
  console.log(`   GET    /correio`);
  console.log(`   POST   /correio`);
  console.log(`   DELETE /correio/:id`);
  console.log(`   GET    /produtos`);
  console.log(`   GET    /produtos/:id`);
  console.log(`   POST   /produtos`);
  console.log(`   PUT    /produtos/:id`);
  console.log(`   DELETE /produtos/:id`);
  console.log(`   GET    /pedidos`);
  console.log(`   POST   /pedidos`);
  console.log('');
});
 
module.exports = app;