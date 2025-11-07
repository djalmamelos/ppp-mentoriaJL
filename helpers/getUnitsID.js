const request = require('supertest');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const { respostaPremio } = require('../helpers/getID')

const UnidadePremio = async () => {
    token = await obterToken('admin', '123456')
    id = await respostaPremio()
    const respostaUnidade = await request(process.env.BASE_URL)
        .get(`/api/prizes/${id}`)
        .set('Authorization', `Bearer ${token}`)


    return respostaUnidade.body.units[0].id

}

module.exports = {
    UnidadePremio
}