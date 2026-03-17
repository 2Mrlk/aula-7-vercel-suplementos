// =============================================================
// routes/categorias.js — Rotas de Categorias (Suplementos)
// =============================================================
// O que são Rotas?
//   Rotas definem os "endereços" da nossa API e o que acontece
//   quando alguém acessa cada endereço (URL).
//
// O que é um Router?
//   O express.Router() funciona como um "mini-aplicativo" Express. 
//   Ele permite separar as rotas em arquivos diferentes por assunto 
//   (categorias, suplementos, usuários), mantendo o projeto organizado.
//
// Prefixo de rotas:
//   Se no server.js registrarmos este arquivo em '/api/categorias',
//   a rota '/' escrita aqui será acessada como '/api/categorias'.
// =============================================================

const express = require('express');

// ─── Criação do Router ────────────────────────────────────────
// Iniciamos o roteador para gerenciar os endpoints de categorias.
const router = express.Router();

// ─── Importação do banco de dados ────────────────────────────
// Buscamos os dados em memória que estão na pasta /data.
// '../' sobe um nível na pasta para encontrar o arquivo correto.
const db = require('../data/database');

// ─── [GET] /api/categorias ────────────────────────────────────
// Retorna a lista de todas as categorias de suplementos cadastradas.
//
// Teste no Thunder Client / Insomnia:
//   Método: GET
//   URL: http://localhost:3000/api/categorias
//
// Resposta esperada:
//   [ { "id": 1, "nome": "Proteínas" }, { "id": 2, "nome": "Vitaminas" } ]
router.get('/', (req, res) => {
    // Pegamos o array 'categorias' de dentro do nosso arquivo db (database.js)
    // e enviamos de volta para quem pediu.
    res.json(db.categorias);
});

// ─── [POST] /api/categorias ───────────────────────────────────
// Permite cadastrar uma nova categoria de suplementos.
//
// Teste no Thunder Client / Insomnia:
//   Método: POST
//   URL: http://localhost:3000/api/categorias
//   Body (JSON): { "nome": "Acessórios" }
//
// Resposta esperada (status 201 Created):
//   { "id": 5, "nome": "Acessórios" }
router.post('/', (req, res) => {
    // Montamos o objeto da nova categoria:
    const novaCategoria = {
        // Cálculo simples de ID: pegamos o total de itens e somamos 1
        id: db.categorias.length + 1, 
        
        // O nome vem de dentro do 'body' da requisição (o JSON enviado)
        nome: req.body.nome 
    };

    // Salvamos a nova categoria no nosso array em memória
    db.categorias.push(novaCategoria);

    // Retornamos o status 201 (Sucesso ao criar) e o objeto criado
    res.status(201).json(novaCategoria);
});

// ─── Exportação do Router ─────────────────────────────────────
// Tornamos este roteador disponível para ser importado no server.js.
module.exports = router;