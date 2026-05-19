const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase');

// GET /api/pedidos — lista todos os pedidos
router.get('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('pedidos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        next(err);
    }
});

// POST /api/pedidos — registra um novo pedido
router.post('/', async (req, res, next) => {
    try {
        const { cliente_nome, cliente_endereco, itens, total } = req.body;

        if (!cliente_nome || !cliente_endereco || !itens || total == null) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'cliente_nome, cliente_endereco, itens e total são obrigatórios'
            });
        }

        const { data, error } = await supabase
            .from('pedidos')
            .insert([{ cliente_nome, cliente_endereco, itens, total, status: 'pendente' }])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
