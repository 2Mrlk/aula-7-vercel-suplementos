const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase');

// GET /api/produtos/erro-teste — rota de teste de erro
router.get('/erro-teste', (req, res) => {
    throw new Error('Erro de teste do servidor de Suplementos!');
});

// GET /api/produtos — lista todos os produtos (com filtro opcional por categoriaId)
router.get('/', async (req, res, next) => {
    try {
        const { categoriaId } = req.query;
        let consulta = supabase.from('produtos').select('*, categorias(nome)');

        if (categoriaId) {
            consulta = consulta.eq('categoria_id', categoriaId); // corrigido: era 'categoriaId'
        }

        const { data, error } = await consulta.order('criado_em', { ascending: true });

        if (error) throw error;
        res.json(data);
    } catch (err) {
        next(err);
    }
});

// GET /api/produtos/:id — busca um produto específico
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('produtos')
            .select('*, categorias(nome)')
            .eq('id', id)
            .maybeSingle();

        if (error) throw error;
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
    } catch (err) {
        next(err);
    }
});

// POST /api/produtos — cria um produto
router.post('/', async (req, res, next) => {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .insert([req.body])
            .select();

        if (error) throw error;
        res.status(201).json(data[0]);
    } catch (err) {
        next(err);
    }
});

// PUT /api/produtos/:id — atualiza um produto
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase
            .from('produtos')
            .update(req.body)
            .eq('id', id)
            .select();

        if (error) throw error;
        if (data && data.length > 0) {
            res.json(data[0]);
        } else {
            res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
    } catch (err) {
        next(err);
    }
});

// DELETE /api/produtos/:id — remove um produto
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error } = await supabase
            .from('produtos')
            .delete()
            .eq('id', id);

        if (error) throw error;
        res.json({ mensagem: 'Produto deletado com sucesso' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
