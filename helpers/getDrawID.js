const request = require('supertest');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')

const respostaSorteio = async () => {
    token = await obterToken('admin', '123456')
    const respostaSorteio = await request(process.env.BASE_URL)
        .get('/api/draws?page=1&limit=10')
        .set('Authorization', `Bearer ${token}`)

    return respostaSorteio.body.draws[0].id
}

    module.exports = {
        respostaSorteio
    }