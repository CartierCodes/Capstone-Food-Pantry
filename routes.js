const express = require('express');

const bcrypt = require('bcrypt');
const passport = require('passport')
const router = express.Router();
const User = require('./models/User')


const FoodItem = require("./models/FoodItem")



router.get('/', async (req, res) => {
    res.render('home', {
        title: "Food Bank"
    });
});


router.get('/login', async (req, res) => {
    res.render('login', {
        title: "Login / Sign up"
    })
})


// to be delted
// a middleware just for checking the intermediate values
function check(req, res, next) {
    //console.log("login post called with username: "+req.body.username+" pass: "+req.body.password);
    next()
}


router.post('/login', check, passport.authenticate('local', {
    successRedirect: '/inventory',
    failureRedirect: '/login',
    failureFlash: true
}))

router.post('/register', async (req, res) => {
    try {
        const email = req.body.email
        const hash = await bcrypt.hash(req.body.password, 10)

        let user = new User({email: email,password: hash})
        await user.save()
        res.render('login', {
            title: "Login / Sign up",
            success:true
        });
    } catch (error) {
        console.log(error)
    }

});

router.all('/inventory', async (req, res) => {
    res.render('inventory', {
        title: "Inventory",
        user:req.user
    });
});


module.exports = router