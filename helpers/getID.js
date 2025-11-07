const request = require('supertest');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')

const respostaPremio = async () => {
    token = await obterToken('admin', '123456')
    const respostaPremios = await request(process.env.BASE_URL)
        .get('/api/prizes?page=1&limit=10')
        .set('Authorization', `Bearer ${token}`)

    return respostaPremios.body[0].id
}

    module.exports = {
        respostaPremio
    }