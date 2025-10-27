const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

const ensureAuth = (req, res, next) => {
  if (!req.session.token) {
    return res.redirect('/');
  }
  next();
};

const authAxios = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` }
  });
};

router.use(ensureAuth);

router.get('/', async (req, res) => {
  try {
    const { data: prizes } = await authAxios(req.session.token).get('/prizes');
    res.render('prizes/index', { prizes, error: null });
  } catch (error) {
    res.render('prizes/index', { 
      prizes: [],
      error: 'Erro ao carregar prêmios'
    });
  }
});

router.get('/new', (req, res) => {
  res.render('prizes/new', { error: null });
});

router.post('/:id/delete', async (req, res) => {
  try {
    await authAxios(req.session.token).delete(`/prizes/${req.params.id}`);
    return res.redirect('/prizes');
  } catch (error) {
    console.error('Erro ao deletar prêmio:', error.response?.data || error.message);
    // try to fetch prize to render page with error
    try {
      const { data: prize } = await authAxios(req.session.token).get(`/prizes/${req.params.id}`);
      return res.render('prizes/show', { prize, error: 'Erro ao deletar prêmio: ' + (error.response?.data?.error || error.message) });
    } catch (e) {
      return res.redirect('/prizes');
    }
  }
});

router.post('/', async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      quantity: parseInt(req.body.quantity, 10)
    };

    if (!payload.name || !payload.quantity || payload.quantity < 1) {
      throw new Error('Nome e quantidade são obrigatórios. Quantidade deve ser maior que zero.');
    }

    await authAxios(req.session.token).post('/prizes', payload);
    res.redirect('/prizes');
  } catch (error) {
    console.error('Erro ao criar prêmio:', error.response?.data || error.message);
    res.render('prizes/new', {
      error: 'Erro ao criar prêmio: ' + (error.response?.data?.error || error.message)
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { data: prize } = await authAxios(req.session.token).get(`/prizes/${req.params.id}`);
    res.render('prizes/show', { prize, error: null });
  } catch (error) {
    res.render('prizes/show', {
      prize: null,
      error: 'Prêmio não encontrado'
    });
  }
});

router.post('/unit/:unitId', async (req, res) => {
  try {
    if (req.body._method === 'DELETE') {
      await authAxios(req.session.token).delete(`/prizes/unit/${req.params.unitId}`);
      // Após deletar, redireciona para a lista de prêmios para atualizar
      return res.redirect('/prizes');
    }
    res.redirect('back');
  } catch (error) {
    console.error('Erro ao deletar unidade:', error.response?.data || error.message);
    // Se houver erro, volta para a página anterior com mensagem de erro
    res.render('prizes/show', {
      prize: null,
      error: 'Erro ao deletar unidade: ' + (error.response?.data?.error || error.message)
    });
  }
});

module.exports = router;