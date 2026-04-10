// =============================================================
// routes/produtos.js — Rotas de Produtos (CRUD Completo)
// =============================================================

const express = require('express');
const router = express.Router();
let db = require('../data/database');
// ⚠️ Usamos 'let' porque a rota DELETE vai reatribuir db.suplementos
// (Antes estava db.produtos, o que causava erro pois no database.js o nome é suplementos)

// =============================================================
// ── ROTA DE TESTE DE ERRO
// =============================================================
router.get('/erro-teste', (req, res) => {
    throw new Error("O servidor do Haruy Sushi tropeçou!");
});

// =============================================================
// ── [GET] /api/produtos (Listar todos ou filtrar)
// =============================================================
router.get('/', (req, res) => {
    const categoriaId = req.query.categoriaId;

    if (categoriaId) {
        // CORREÇÃO: Alterado de db.produtos para db.suplementos
        const produtosFiltrados = db.suplementos.filter(p => p.categoriaId == categoriaId);
        return res.json(produtosFiltrados);
    }

    // CORREÇÃO: Alterado de db.produtos para db.suplementos
    res.json(db.suplementos);
});

// =============================================================
// ── [GET] /api/produtos/:id (Buscar por ID)
// =============================================================
router.get('/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);

    // CORREÇÃO: Alterado de db.produtos para db.suplementos
    const produto = db.suplementos.find(p => p.id === produtoId);

    if (produto) {
        res.json(produto);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
});

// =============================================================
// ── [POST] /api/produtos (Criar novo)
// =============================================================
router.post('/', (req, res) => {
    // CORREÇÃO: Alterado de db.produtos para db.suplementos
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

    // CORREÇÃO: Alterado de db.produtos para db.suplementos
    db.suplementos.push(novoProduto);

    res.status(201).json(novoProduto);
});

// =============================================================
// ── [PUT] /api/produtos/:id (Atualizar)
// =============================================================
router.put('/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);

    // CORREÇÃO: Alterado de db.produtos para db.suplementos
    const index = db.suplementos.findIndex(p => p.id === produtoId);

    if (index !== -1) {
        // CORREÇÃO: Alterado de db.produtos para db.suplementos
        db.suplementos[index] = { ...db.suplementos[index], ...req.body };
        res.json(db.suplementos[index]);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
});

// =============================================================
// ── [DELETE] /api/produtos/:id (Remover)
// =============================================================
router.delete('/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);

    // CORREÇÃO: Alterado de db.produtos para db.suplementos
    db.suplementos = db.suplementos.filter(p => p.id !== produtoId);

    res.json({ mensagem: 'Produto deletado com sucesso!' });
});

module.exports = router;
