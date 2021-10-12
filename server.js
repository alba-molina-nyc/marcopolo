// Require Deps
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const indexController = require('./controllers/index');
const usersController = require('./controllers/users');
const postsController = require('./controllers/posts');
const expressSession = require('express-session');
const methodOverride = require('method-override');


// Initialize Express App
const app = express();
// Configure Settings
require('dotenv').config();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB')
});
db.on('error', (error) => {
    console.log('An Error Occurred with MongoDB ${error.message}')
});
db.on('disconnected', () => console.log('mongo disconnected'))

app.set('view engine', 'ejs')
// Mount Middleware

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({
    secret: 'cknlkclnclnen', // this is used to digitally sign our session cookies (prevents forgery)
    resave: false, // this option updates session storage after request
    saveUninitialized: false
}));
// Mount Routes
app.use('/', indexController);
app.use('/', usersController);
app.use('/', postsController);
// Tell the App to Listen
app.listen(PORT, () => {
    console.log('Express is listening on port:${PORT)')
});
