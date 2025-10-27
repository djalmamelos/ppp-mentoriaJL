const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

router.get('/', (req, res) => {
  if (req.session.token) {
    return res.redirect('/prizes');
  }
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, req.body);
    req.session.token = data.token;
    res.redirect('/prizes');
  } catch (error) {
    res.render('login', { 
      error: 'Credenciais inválidas'
    });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;