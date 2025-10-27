# API de Prêmios e Sorteios

Projeto simples em Node.js/Express para acompanhar estoque de prêmios (unidades) e registrar sorteios.

Principais características
- Registro de admin (seeded: username: admin, password: admin)
- Login com JWT (Bearer token)
- Criar prêmio com quantidade (cada unidade é armazenada separadamente)
- Listar prêmios com total em estoque
- Buscar dados de um prêmio (inclui unidades restantes)
- Deletar unidade (remove 1 unidade específica)
- Registrar sorteio informando unitId e metadados (gender, neighborhood, program, age)
- Listar sorteios com agregações por gender, neighborhood, program e faixas etárias
- Deletar sorteio: unidade volta ao estoque
- Documentação Swagger disponível em /docs

Como executar

1. Instale dependências

```bash
npm install
```

2. Inicie o servidor

```bash
npm start
```

O servidor roda por padrão em http://localhost:3000

Endpoints principais
- POST /api/auth/login -> { username, password } => { token }
- POST /api/prizes -> (protected) { name, quantity }
- GET /api/prizes -> (protected) lista com total
- GET /api/prizes/:id -> (protected) detalhes do prêmio e unidades
- DELETE /api/prizes/unit/:unitId -> (protected) remove unidade
- POST /api/draws -> (protected) { unitId, gender, neighborhood, program, age }
- GET /api/draws -> (protected) lista de sorteios + agregações
- DELETE /api/draws/:id -> (protected) deleta sorteio e retorna unidade ao estoque

Swagger

Abra http://localhost:3000/docs para visualizar a documentação Swagger UI.

Notas
- Banco em memória: os dados são perdidos quando o processo é reiniciado.
- Para simplicidade o admin inicial tem senha em texto. Em produção, use hashing e variáveis de ambiente seguras.
