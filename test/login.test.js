const request = require('supertest');
const { expect } = require('chai')
require ('dotenv').config()

describe('Teste de Login', () =>{
    describe('POST/login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais validas', async () => {
            const resposta = await request(process.env.BASE_URL)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                'username': 'admin',
                'password':'123456'
            })


            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        });
    });
    it('Deve retornar 401 sem um token em string quando usar credenciais invalidas', async () => {
            const resposta = await request(process.env.BASE_URL)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                'username': 'admin',
                'password':'654321'
            })


            expect(resposta.status).to.equal(401);
            expect(resposta.body.error).to.be.a('string');
        });
});