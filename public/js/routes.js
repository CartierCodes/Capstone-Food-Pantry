const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('home', {
        title: "Food Bank Home Page"
    });
});

router.get('/login', async (req, res) => {
    res.render('login', {
        title: "Login"
    });
});

router.get('/inventory', async (req, res) => {
    res.render('inventory', {
        title: "Inventory"
    });
});

module.exports = router;