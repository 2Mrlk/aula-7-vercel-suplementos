// =============================================================
// data/database.js — Banco de Dados em Memória
// =============================================================
// O que é isso?
//   Em vez de usar um banco de dados real (como MySQL ou MongoDB),
//   guardamos os dados aqui mesmo, dentro de arrays do JavaScript.
//   Isso funciona enquanto o servidor está ligado.
//   Quando o servidor reinicia, os dados voltam para o estado inicial.
//
// Por que usar isso nas aulas?
//   Simplifica o aprendizado! Não precisamos instalar e configurar
//   um banco de dados externo. O foco é aprender a API e os Middlewares.
// =============================================================

// ─── Tabela de Categorias ─────────────────────────────────────
// Cada categoria agrupa produtos relacionados na loja.
let categorias = [
    { id: 1, nome: 'Proteínas' },
    { id: 2, nome: 'Vitaminas' },
    { id: 3, nome: 'Aminoácidos' },
    { id: 4, nome: 'Termogênicos' }
];

// ─── Tabela de Suplementos ────────────────────────────────────
// Cada suplemento tem um ID único, pertence a uma categoria (categoriaId),
// e possui nome, descrição, preço e o link da imagem.
let suplementos = [
    {
        id: 1,
        categoriaId: 1,
        nome: 'Whey Protein',
        descricao: 'Suplemento de proteína para ganho de massa muscular.',
        preco: 120.00,
        imagem: 'https://darklabsuplementos.com.br/cdn/shop/files/whey-protein-concentrado-1kg-pacoca-dark-lab-1.webp?v=1771438025&width=990.jpg'
    },
    {
        id: 2,
        categoriaId: 2,
        nome: 'Vitamina C',
        descricao: 'Auxilia na imunidade e combate radicais livres.',
        preco: 35.00,
        imagem: 'https://www.gsuplementos.com.br/upload/produto/layout/174/mockup.webp'
    },
    {
        id: 3,
        categoriaId: 3,
        nome: 'BCAA',
        descricao: 'Aminoácidos essenciais para recuperação muscular.',
        preco: 75.00,
        imagem: 'https://www.gsuplementos.com.br/upload/produto/layout/25/bcaa-2-1-1-120comp-growth-supplements-v2.webp'
    },
    {
        id: 4,
        categoriaId: 4,
        nome: 'Cafeína',
        descricao: 'Termogênico para aumento de energia e foco.',
        preco: 40.00,
        imagem: 'https://www.gsuplementos.com.br/upload/produto/layout/2042/cafeina-200-mg-120-comp-growth-supplements-v2.webp'
    }
];

// ─── Exportação dos dados ─────────────────────────────────────
// Exportamos as duas variáveis num único objeto para que outros
// arquivos (como as rotas) possam importar e usar esses dados.
module.exports = { categorias, suplementos };