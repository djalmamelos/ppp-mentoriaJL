const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postPrizes = require('../fixtures/postPrizes.json')
const { respostaPremio } = require('../helpers/getID')
const { UnidadePremio } = require('../helpers/getUnitsID')

describe('Prizes', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('admin', '123456')
    })
    describe('POST/api/prizes', () => {

        it('Deve Retornar sucesso 201 quando o prêmio for criado', async () => {
            const bodyPrizes = { ...postPrizes }

            const resposta = await request(process.env.BASE_URL)
                .post('/api/prizes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(
                    bodyPrizes
                )

            expect(resposta.status).to.equal(201);
        });

        it('Deve Retornar Erro 400 quando tentar criar o premio com quantidade negativa ', async () => {
            const bodyPrizes = { ...postPrizes }
            bodyPrizes.quantity = -2
            const resposta = await request(process.env.BASE_URL)
                .post('/api/prizes')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(
                    bodyPrizes
                )
            expect(resposta.status).to.equal(400);
        });
    })
    describe('GET/api/prizes', () => {
        it('Deve retornar sucesso com 200 e dados iguais quando ID for válido', async () => {

            const resposta = await request(process.env.BASE_URL)
                .get('/api/prizes?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200)
            expect(resposta.body).to.be.an('array')


        })

    })
    describe('GET/api/prizes{ID} ', () => {
 
        it('Deve Retornar o nome do Premio criado anteriormente', async () => {
            id = await respostaPremio()
            const resposta = await request(process.env.BASE_URL)
                .get(`/api/prizes/${id}`)
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200)
            expect(resposta.body.id).to.equal(`${id}`)

        })
    })
    describe('PATCH/api/prizes{id} ', () => {

        it('Deve Retornar Erro 200 quando for atualizar nome de premio ', async () => {
            const bodyPrizes = { ...postPrizes }
            bodyPrizes.name = 'Teste de Premio'
            id = await respostaPremio()
            const resposta = await request(process.env.BASE_URL)
                .patch(`/api/prizes/${id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(
                    bodyPrizes
                )
            expect(resposta.status).to.equal(200);
            expect(resposta.body.id).to.equal(`${id}`)
        })
    })
    describe('DELETE/api/prizes{id} ', () => {

        it('Deve Retornar Erro 400 por premio ter quantidade em estoque', async () => {
            id = await respostaPremio()
            const resposta = await request(process.env.BASE_URL)
                .delete(`/api/prizes/${id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
               
            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('prize_has_units')
        })
    })

    describe('DELETE/api/prizes{id} ', () => {

        it('Deve Retornar Erro 400 por premio ter quantidade em estoque', async () => {
            id = await respostaPremio()
            const resposta = await request(process.env.BASE_URL)
                .delete(`/api/prizes/${id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
               
            expect(resposta.status).to.equal(400);
            expect(resposta.body.error).to.equal('prize_has_units')
        })
    })

      describe('DELETE/api/prizes{id} ', () => {

        it('Deve Retornar  204 ao deletar a unidade do premio em estoque', async () => {
            id = await UnidadePremio()
            const resposta = await request(process.env.BASE_URL)
                .delete(`/api/prizes/unit/${id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
               
            expect(resposta.status).to.equal(204);
        })
    })
})
