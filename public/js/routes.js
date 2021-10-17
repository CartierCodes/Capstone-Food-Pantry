const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('home', {
        title: "Food Bank Home Page"
    });
});

module.exports = router;