const request = require('supertest');
require('dotenv').config()

const obterToken = async (usuario, senha) => {
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send({
            'username': usuario,
            'password': senha
        })

    return respostaLogin.body.token
}

module.exports = {
    obterToken
}