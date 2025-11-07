**Objetivo**
Criar uma API Rest para acompanhamento de estoque de prêmios e registro de sorteios em uma emissora de rádio.

**Contexto**
- A API possui as seguintes funcionalidades: registro de admin, registro de prêmio, busca de prêmios com a quantidade total em estoque, busca de dados de prêmios, registro de nome do premio e quantidade que tem em estoque.
 - Preciso ter uma funcionalidade de deletar o premio pela unidade dele. 
 - Preciso também de uma funcionalidade de premios sorteados onde o id da unidade do premio é levado para ele e informamos como parâmetro  se foi sorteado o gênero (sexo)  / bairro /  em qual programa da emissora que foi sorteado / idade . 
 - Preciso depois conseguir listar todos os premios sorteados com as informações passadas. 
 - Preciso poder deletar o prêmio sorteado, o item voltará para a lista de prêmios. 
 - Preciso que a listagem de premios sorteados agreguem o total separado de cada parâmetro passado. Em idade agrupe faixa etárias em (0-17, 18-24, 25-29,30-39,40-49,50-59, 60+)
 
- Para que eu possa usar as funcionalidades, preciso fazer login como admin.
  

**Regras**
- Não me pergunte nada, só faça.
- A documentação da API deve ser feita com Swagger, em forma de arquivo, crie esse arquivo em uma pasta de recursos. O swagger precisa descrever o modelo JSON da resposta de cada endpoint com base na forma que API for implementada. O Swagger também deve contemplar os status code de erro que serão implementados na API.
- Adicione um endpoint para renderizar o Swagger.
- Construa um arquivo README para descrever o projeto
- Divida a API em camadas: routes, controllers, service e model
- Armazene os dados da API em um banco de dados em memória
- Utilize a biblioteca express para construir a API Rest
- Faça com que a autenticação seja parte do Middleware, utilizando token JWT como modelo de autenticação, e implemente as regras de autenticação seguindo as informações descritas no contexto.