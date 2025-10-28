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
    const { data } = await authAxios(req.session.token).get('/draws');
    res.render('draws/index', { ...data, error: null });
  } catch (error) {
    res.render('draws/index', {
      draws: [],
      totals: { gender: {}, neighborhood: {}, program: {}, ageGroup: {} },
      error: 'Erro ao carregar sorteios'
    });
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const [{ data: drawsData }, { data: prizesData }] = await Promise.all([
      authAxios(req.session.token).get('/draws'),
      authAxios(req.session.token).get('/prizes')
    ]);

    const draw = drawsData.draws.find(d => d.id === req.params.id);
    if (!draw) return res.redirect('/draws');

    return res.render('draws/edit', {
      draw,
      prizes: prizesData,
      error: null
    });
  } catch (err) {
    console.error(err);
    return res.redirect('/draws');
  }
});

router.get('/new', (req, res) => {
  res.render('draws/new', { 
    unitId: req.query.unitId,
    error: null 
  });
});

router.post('/', async (req, res) => {
  try {
    const payload = {
      unitId: req.body.unitId,
      gender: req.body.gender,
      neighborhood: req.body.neighborhood,
      program: req.body.program,
      age: parseInt(req.body.age, 10)
    };

    if (!payload.unitId || !payload.gender || !payload.neighborhood || !payload.program || !payload.age) {
      throw new Error('Todos os campos são obrigatórios');
    }

    await authAxios(req.session.token).post('/draws', payload);
    res.redirect('/draws');
  } catch (error) {
    console.error('Erro ao registrar sorteio:', error.response?.data || error.message);
    res.render('draws/new', {
      unitId: req.body.unitId,
      error: 'Erro ao registrar sorteio: ' + (error.response?.data?.error || error.message)
    });
  }
});

router.post('/:id', async (req, res) => {
  try {
    if (req.body._method === 'DELETE') {
      await authAxios(req.session.token).delete(`/draws/${req.params.id}`);
    }
    if (req.body._method === 'PATCH') {
      // update draw metadata (gender, neighborhood, program, age)
      const payload = {
        gender: req.body.gender,
        neighborhood: req.body.neighborhood,
        program: req.body.program,
        age: req.body.age
      };
      await authAxios(req.session.token).patch(`/draws/${req.params.id}`, payload);
    }
    res.redirect('/draws');
  } catch (error) {
    res.redirect('/draws');
  }
});

module.exports = router;