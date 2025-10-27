const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../resources/swagger.json');
const authRoutes = require('./routes/authRoutes');
const prizeRoutes = require('./routes/prizeRoutes');
const drawRoutes = require('./routes/drawRoutes');
const { authenticate } = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

// protected routes
app.use('/api/prizes', authenticate, prizeRoutes);
app.use('/api/draws', authenticate, drawRoutes);

// swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
