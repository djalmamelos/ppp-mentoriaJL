const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Configure sessions
app.use(session({
  secret: 'change-me-in-prod',
  resave: false,
  saveUninitialized: false
}));

// Static files and JSON parsing
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', require('./routes/auth'));
app.use('/prizes', require('./routes/prizes'));
app.use('/draws', require('./routes/draws'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render('error', { 
    message: 'Something went wrong',
    error: err.message
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Web server running on port ${PORT}`));