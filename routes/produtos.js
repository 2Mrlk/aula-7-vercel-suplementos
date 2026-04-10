const express = require('express');
const router = express.Router();
let db = require('../data/database');

// ROTA DE TESTE
router.get('/erro-teste', (req, res) => {
    throw new Error("O servidor do Haruy Sushi tropeçou!");
});

// [GET] /api/produtos
router.get('/', (req, res) => {
    const categoriaId = req.query.categoriaId;
    if (categoriaId) {
        // CORREÇÃO: trocado db.produtos por db.suplementos
        const produtosFiltrados = db.suplementos.filter(p => p.categoriaId == categoriaId);
        return res.json(produtosFiltrados);
    }
    // CORREÇÃO: trocado db.produtos por db.suplementos
    res.json(db.suplementos);
});

// [GET] por ID
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

// [POST] - ONDE DAVA O ERRO "NOT ITERABLE"
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

// [PUT]
router.put('/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    // CORREÇÃO: trocado db.produtos por db.suplementos
    const index = db.suplementos.findIndex(p => p.id === produtoId);
    if (index !== -1) {
        db.suplementos[index] = { ...db.suplementos[index], ...req.body };
        res.json(db.suplementos[index]);
    } else {
        res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }
});

// [DELETE]
router.delete('/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    // CORREÇÃO: trocado db.produtos por db.suplementos
    db.suplementos = db.suplementos.filter(p => p.id !== produtoId);
    res.json({ mensagem: 'Produto deletado com sucesso!' });
});

module.exports = router;
