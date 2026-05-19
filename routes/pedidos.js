const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase');

// GET /api/pedidos — lista todos os pedidos
router.get('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .order('id', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        next(err);
    }
});

// POST /api/pedidos — registra um novo pedido
router.post('/', async (req, res, next) => {
    try {
        const { produto_id, produto_nome, preco } = req.body;

        const { data, error } = await supabase
            .from('pedidos')
            .insert([{ produto_id: produto_id || null, produto_nome, preco }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;