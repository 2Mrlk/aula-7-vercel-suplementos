// =============================================================
// routes/produtos.js — Rotas de Produtos (CRUD Completo)
// =============================================================
// O que é CRUD?
//   Create (POST)   → Criar produto novo
//   Read   (GET)    → Ler/listar produtos
//   Update (PUT)    → Atualizar produto existente
//   Delete (DELETE) → Remover produto
//
// Todas as 4 operações estão implementadas aqui!
// =============================================================

const express = require('express');
const router = express.Router();
let db = require('../data/database');
// ⚠️ Usamos 'let' (não 'const') porque a rota DELETE vai
//    reatribuir db.suplementos com um novo array filtrado.

// =============================================================
// ── AULA 6: ROTA ESPECIAL PARA TESTE DE ERRO ─────────────────
// =============================================================
router.get('/erro-teste', (req, res) => {
    // throw new Error() lança um erro intencional.
    throw new Error("O servidor do Haruy Sushi tropeçou!");
});

// =============================================================
// ── [GET] /api/produtos ───────────────────────────────────────
// =============================================================
router.get('/', (req, res) => {

    // Tentamos ler o parâmetro "categoriaId" da URL (ex: ?categoriaId=1)
    const categoriaId = req.query.categoriaId;

    // Se o parâmetro foi enviado, filtramos os produtos por categoria
    if (categoriaId) {
        // CORREÇÃO: trocado db.produtos por db.suplementos
        const produtosFiltrados = db.suplementos.filter(p => p.categoriaId == categoriaId);
        return res.json(produtosFiltrados);
    }

    // CORREÇÃO: trocado db.produtos por db.suplementos
    res.json(db.suplementos);
});

// =============================================================
// ── [GET] /api/produtos/:id ───────────────────────────────────
// =============================================================
router.get('/:id', (req, res) => {

    const produtoId = parseInt(req.params.id);

    // CORREÇÃO: trocado db.produtos por db.suplementos
    const produto = db.suplementos.find(p => p.id === produtoId);

    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
});

// =============================================================
// ── [POST] /api/produtos ──────────────────────────────────────
// =============================================================
router.post('/', (req, res) => {

    // CORREÇÃO: trocado db.produtos por db.suplementos
    const novoId = db.suplementos.length > 0
        ? Math.max(...db.suplementos.map(p => p.id)) + 1
        : 1;

    const novoProduto = {
        id: novoId,
        categoriaId: req.body.categoriaId,
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        imagem: req.body.imagem
    };

    // CORREÇÃO: trocado db.produtos por db.suplementos
    db.suplementos.push(novoProduto);

    res.status(201).json(novoProduto);
});

// =============================================================
// ── [PUT] /api/produtos/:id ───────────────────────────────────
// =============================================================
router.put('/:id', (req, res) => {

    const produtoId = parseInt(req.params.id);

    // CORREÇÃO: trocado db.produtos por db.suplementos
    const index = db.suplementos.findIndex(p => p.id === produtoId);

    if (index !== -1) {
        // CORREÇÃO: trocado db.produtos por db.suplementos
        db.suplementos[index] = { ...db.suplementos[index], ...req.body };
        res.json(db.suplementos[index]);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
});

// =============================================================
// ── [DELETE] /api/produtos/:id ────────────────────────────────
// =============================================================
router.delete('/:id', (req, res) => {

    const produtoId = parseInt(req.params.id);

    // CORREÇÃO: trocado db.produtos por db.suplementos
    db.suplementos = db.suplementos.filter(p => p.id !== produtoId);

    res.json({ mensagem: 'Produto deletado com sucesso!' });
});

module.exports = router;
