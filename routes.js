const express = require('express');

const bcrypt = require('bcrypt');
const passport = require('passport')
const router = express.Router();
const User = require('./models/User')
const FoodItem = require("./models/FoodItem")



router.get('/', async (req, res) => {
    res.render('home', {
        title: "Food Bank",
        user:req.user
    });
});


router.get('/login', async (req, res) => {
    res.render('login', {
        title: "Login / Sign up",
        user:req.user
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
        let employeeAccount = false;
        const rawEmployeeAccount = req.body.employeeCheck;
        if (rawEmployeeAccount) employeeAccount = true;
        

        let user = new User({
            email: email,
            password: hash,
            employee: employeeAccount
        })
        await user.save()

        res.render('login', {
            title: "Login / Sign up",
            success:true
        });
    } catch (error) {
        console.log(error)
    }

});

router.get('/inventory', async (req, res) => {
    tempEmployee = false
    if (req.user && req.user.employee) tempEmployee = true;

    FoodItem.find({}).exec().then(async (foodItems) => {
        res.render('inventory', {
            title: "Inventory",
            user:req.user,
            employee: tempEmployee,
            food: foodItems
        });
    });
});

router.post('/inventory', async (req, res) => {
    try {
        const item = req.body.item
        const location = req.body.location
        const category = req.body.category
        const quantity = req.body.quantity  

        let foodItem = new FoodItem({
            title: item,
            location: location,
            category: category,
            quantity:quantity
        })

        await foodItem.save()
        console.log("added to database")

        FoodItem.find({}).exec().then(async (foodItems) => {
            res.render('inventory', {
                title: "Inventory",
                user:req.user,
                employee: tempEmployee,
                food: foodItems
            });
        });
    } catch (error) {
        console.log(error)
    }
});



module.exports = router