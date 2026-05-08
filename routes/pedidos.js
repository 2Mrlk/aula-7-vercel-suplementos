const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase');

router.get('/', async (req, res, next) => {
    try {
        const { data: data, error } = await supabase
            .from('pedidos')
            .select('*')
            .order('id', { ascending: false });
        if (error) throw error;
        res.json(data);
    } catch (err) {
        next(err);
    }
});