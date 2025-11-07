const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postDraws = require('../fixtures/postDraws.json')
const { respostaSorteio } = require('../helpers/getDrawID')
const { UnidadePremio } = require('../helpers/getUnitsID')

describe('Draws', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('admin', '123456')
    })
    describe('POST/api/draws', async ()  => {
     id = await UnidadePremio()
        it('Deve Retornar sucesso 201 quando o sorteio for criado', async () => {
            const bodyDraws = { ...postDraws }
            bodyDraws.unitId = `${id}`
            const resposta = await request(process.env.BASE_URL)
                .post('/api/draws')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(
                    bodyDraws
                )

            expect(resposta.status).to.equal(201);
            expect(resposta.body).to.have.property('createdAt')
        }) 

    })

    describe('GET/api/draws', () => {
        it('Deve retornar sucesso com 200 e mostrar os sorteios realizados', async () => {

            const resposta = await request(process.env.BASE_URL)
                .get('/api/draws?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200)
            


        })

    })
    describe('DELETE/api/draws', () => {

        it('Deve Retornar sucesso 204 quando o sorteio for Deletado', async () => {
            id = await respostaSorteio()
            const resposta = await request(process.env.BASE_URL)
                .delete(`/api/draws/${id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
               
            expect(resposta.status).to.equal(204);
             console.log(resposta)
        })
    
        
     })



 })



//     describe('GET/api/prizes{ID} ', () => {
 
//         it('Deve Retornar o nome do Premio criado anteriormente', async () => {
//             id = await respostaPremio()
//             const resposta = await request(process.env.BASE_URL)
//                 .get(`/api/prizes/${id}`)
//                 .set('Authorization', `Bearer ${token}`)

//             expect(resposta.status).to.equal(200)
//             expect(resposta.body.id).to.equal(`${id}`)

//         })
//     })
//     describe('PATCH/api/prizes{id} ', () => {

//         it('Deve Retornar Erro 200 quando for atualizar nome de premio ', async () => {
//             const bodyPrizes = { ...postPrizes }
//             bodyPrizes.name = 'Teste de Premio'
//             id = await respostaPremio()
//             const resposta = await request(process.env.BASE_URL)
//                 .patch(`/api/prizes/${id}`)
//                 .set('Content-Type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
//                 .send(
//                     bodyPrizes
//                 )
//             expect(resposta.status).to.equal(200);
//             expect(resposta.body.id).to.equal(`${id}`)
//         })
//     })
//     describe('DELETE/api/prizes{id} ', () => {

//         it('Deve Retornar Erro 400 por premio ter quantidade em estoque', async () => {
//             id = await respostaPremio()
//             const resposta = await request(process.env.BASE_URL)
//                 .delete(`/api/prizes/${id}`)
//                 .set('Content-Type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
               
//             expect(resposta.status).to.equal(400);
//             expect(resposta.body.error).to.equal('prize_has_units')
//         })
//     })

//     describe('DELETE/api/prizes{id} ', () => {

//         it('Deve Retornar Erro 400 por premio ter quantidade em estoque', async () => {
//             id = await respostaPremio()
//             const resposta = await request(process.env.BASE_URL)
//                 .delete(`/api/prizes/${id}`)
//                 .set('Content-Type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
               
//             expect(resposta.status).to.equal(400);
//             expect(resposta.body.error).to.equal('prize_has_units')
//         })
//     })

//       describe('DELETE/api/prizes{id} ', () => {

//         it('Deve Retornar  204 ao deletar a unidade do premio em estoque', async () => {
//             id = await UnidadePremio()
//             const resposta = await request(process.env.BASE_URL)
//                 .delete(`/api/prizes/unit/${id}`)
//                 .set('Content-Type', 'application/json')
//                 .set('Authorization', `Bearer ${token}`)
               
//             expect(resposta.status).to.equal(204);
//         })
//     })
// })
