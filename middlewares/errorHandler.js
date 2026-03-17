// =============================================================
// data/database.js — Banco de Dados em Memória (Suplementos)
// =============================================================
// O que é este Arquivo?
//   Um "plano B" (ou atalho didático) para quando não temos um banco
//   de dados real (como MySQL, PostgreSQL ou MongoDB) configurado.
//   Sem ele, teríamos que instalar dependências complexas logo de cara, o que
//   poderia desviar o foco do aprendizado das rotas e da API.
//
// Como funciona?
//   Este é um banco de dados EM MEMÓRIA. Toda vez que uma rota
//   precisar listar, buscar ou adicionar suplementos, ela vai ler e 
//   modificar estas variáveis (arrays) do JavaScript.
//   Assim conseguimos simular um banco de dados de forma simples e direta!
//
// Regra de ouro:
//   ⚠️ Bancos em memória SEMPRE resetam quando o servidor reinicia!
//   Se você adicionar um novo suplemento (via método POST), ele vai funcionar.
//   Mas se o servidor reiniciar (ex: Nodemon atualizar), os dados voltam 
//   exatamente para este estado inicial escrito abaixo.
//
// Posição no projeto:
//   Geralmente fica isolado em uma pasta "data" ou "db".
//   Ele é importado apenas pelos Controllers ou Rotas que precisam ler
//   ou alterar as informações dos produtos.
//
// Fluxo visual de dados:
//   Rota (GET /suplementos) → [database.js] → Array de Suplementos → App Mobile
// =============================================================

// ─── Tabela de Categorias ─────────────────────────────────────
//   id   = identificador único da categoria (Primary Key)
//   nome = o nome da categoria para exibição no aplicativo
const categorias = [
    { id: 1, nome: 'Proteínas' },
    { id: 2, nome: 'Vitaminas' },
    { id: 3, nome: 'Aminoácidos' },
    { id: 4, nome: 'Termogênicos' }
];

// ─── Tabela de Suplementos ────────────────────────────────────
//   id          = identificador único do produto (Primary Key)
//   categoriaId = identificador da categoria (Foreign Key - liga os dados)
//   nome        = título do produto
//   descricao   = texto explicativo do suplemento
//   preco       = valor numérico (Float/Double)
//   imagem      = URL externa para renderizar a foto no Front-end
const suplementos = [
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

// ─── Exportação ───────────────────────────────────────────────
// Exportamos tudo em um único objeto.
// Em outros arquivos, podemos importar usando desestruturação:
// Ex: const { suplementos, categorias } = require('./database');
module.exports = {
    categorias,
    suplementos
};