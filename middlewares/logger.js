// =============================================================
// middlewares/logger.js — Middleware de Log (Supervisão)
// =============================================================
// O que é um Middleware?
//   Pense num Middleware como um SEGURANÇA ou SUPERVISOR na entrada
//   de um restaurante. Toda requisição que chega ao servidor passa
//   por ele ANTES de chegar na rota de destino.
//
//   O Middleware pode:
//     1. Olhar a requisição ("Quem está pedindo?")
//     2. Alterar a requisição ou a resposta
//     3. Barrar a requisição ("Você não tem permissão!")
//     4. Deixar passar (chamando next())
//
// O que este Middleware faz?
//   Anota no terminal (console) a HORA e a ROTA acessada toda vez
//   que alguém fizer um pedido à API. Muito útil para depuração!
//
// Fluxo visual:
//   App Mobile → [Logger Middleware] → Rota → Resposta
// =============================================================

// ─── Definição do Middleware de Log ───────────────────────────
// Um middleware do Express sempre recebe 3 parâmetros básicos:
//   req  = objeto da requisição (os dados do "pedido" que chegou)
//   res  = objeto da resposta (as ferramentas para devolver algo)
//   next = função que "empurra" a requisição para o próximo passo
const loggerMiddleware = (req, res, next) => {

    // Pegamos a hora atual formatada para o padrão brasileiro (ex: 14:30:05)
    const horaAtual = new Date().toLocaleTimeString('pt-BR');

    // Exibimos no terminal do servidor (VS Code):
    //   - A hora exata do acesso entre colchetes
    //   - O Método HTTP (GET, POST, etc.)
    //   - A URL/Rota que o usuário tentou acessar
    console.log(`[${horaAtual}] 📋 Requisição recebida: ${req.method} ${req.url}`);

    // ⚠️ REGRA DE OURO: Chamar o next() é obrigatório!
    // Se você esquecer o next(), a requisição morre aqui, o navegador 
    // do usuário vai ficar carregando infinitamente e o app trava.
    // O next() diz: "Tudo certo por aqui, pode seguir para a rota!"
    next();
};

// ─── Exportação ───────────────────────────────────────────────
// Exportamos a função para que o seu arquivo principal (geralmente server.js
// ou app.js) possa importar e aplicar esse filtro em todas as rotas.
module.exports = loggerMiddleware;