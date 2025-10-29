

# PPP - Aplicação de Prêmios e Sorteios

Este repositório contém uma API REST (Node.js + Express) e uma aplicação web -> [Repositório PPP-MentoriaJL-WEB](https://github.com/djalmamelos/ppp-mentoriaJL-WEB) feita 
 (Express + EJS) para gerenciar prêmios (estoque por unidades) e registrar sorteios.

Resumo rápido
- API: expõe endpoints protegidos por JWT para gerir prêmios, unidades e sorteios.
- Banco de dados em memória: dados não são persistidos entre reinícios (útil para demos e testes).

Arquitetura
- `src/` - código da API (rotas, controllers, models, middleware)
- `resources/` - documentação Swagger (OpenAPI)

Principais funcionalidades implementadas
- Autenticação: login via API que retorna JWT; frontend guarda token em sessão.
- Gestão de prêmios: criar prêmio com quantidade (cada unidade é um objeto único), listar, ver detalhes.
- Gestão de unidades: excluir unidade específica; adicionar unidade (retornar unidade ao estoque quando um sorteio é deletado).
- Sorteios: registrar sorteio (consome uma unidade), listar sorteios com agregações (por gênero, bairro, programa, faixa etária e por prêmio), deletar sorteio (unidade volta ao estoque), editar metadados do sorteio (gênero, bairro, programa, idade).
- Endpoints adicionais: reatribuir unidade a outro prêmio (PATCH `/api/prizes/unit/:unitId`) — disponível para casos de manutenção.

Credenciais seed (in-memory)
- Usuário admin criado automaticamente ao iniciar a API:
	- username: `admin`
	- password: `123456`

Ports padrão
- API: http://localhost:3000


Como rodar (desenvolvimento)
1. Instale dependências (no diretório raiz):

```bash
npm install
```

2. Inicie a API:

```bash
npm run start-api
```


Scripts (em package.json)
- `start-api` - inicia a API em `src/index.js` (porta 3000)
- `dev` - atalho para nodemon (se instalado globalmente ou como dependência de dev)

API (endpoints principais)
- POST `/api/auth/login` -> { username, password } => { token }

- Prêmios
	- POST `/api/prizes` -> (protected) { name, quantity }
	- GET `/api/prizes` -> (protected) lista de prêmios com total em estoque
    - PATCH `/api/prizes` -> (protected) Altera nome principal de prêmios em estoque
	- GET `/api/prizes/:id` -> (protected) detalhes do prêmio e unidades relacionadas
	- DELETE `/api/prizes/:id` -> (protected) hard delete (só se não houver unidades em estoque)
	- DELETE `/api/prizes/unit/:unitId` -> (protected) remover uma unidade específica
	
- Sorteios
	- POST `/api/draws` -> (protected) registrar um sorteio: { unitId, gender, neighborhood, program, age }
	- GET `/api/draws` -> (protected) lista de sorteios + agregações (gender, neighborhood, program, age groups, por prêmio)
	- DELETE `/api/draws/:id` -> (protected) deleta sorteio e retorna unidade ao estoque
	- PATCH `/api/draws/:id` -> (protected) atualiza metadados do sorteio (gender, neighborhood, program, age)

Documentação
- Swagger UI disponível em: http://localhost:3000/docs (carrega `resources/swagger.json`)


Contato / Créditos
- Desenvolvedor: código criado no escopo da mentoria.

Licença
- MIT
