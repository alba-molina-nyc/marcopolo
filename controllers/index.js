const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('home.ejs', { user: req.session.user });
});

router.get('/platform', (req, res) => {
res.render('platform.ejs', { user: req.session.user });
});

router.get('/about', (req, res) => {
    res.render('about.ejs', { user: req.session.user });
});

router.get('/resources', (req, res) => {
    res.render('resources.ejs', { user: req.session.user });
});

module.exports = router;