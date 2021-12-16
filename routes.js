const express = require('express');

const bcrypt = require('bcrypt');
const passport = require('passport')
const router = express.Router();
const User = require('./models/User')
const FoodItem = require("./models/FoodItem")
const nodemailer = require("nodemailer");


router.get('/', async (req, res) => {
    tempEmployee = false
    if (req.user && req.user.employee) tempEmployee = true;

    res.render('home', {
        title: "Food Bank",
        user:req.user,
        employee: tempEmployee
    });
});


router.get('/login', async (req, res) => {
    tempEmployee = false
    if (req.user && req.user.employee) tempEmployee = true;

    res.render('login', {
        title: "Login / Sign up",
        user:req.user,
        employee: tempEmployee
    })
})

// to be delted
// a middleware just for checking the intermediate values
function check(req, res, next) {
    //console.log("login post called with username: "+req.body.username+" pass: "+req.body.password);
    next()
}

router.get('/post-event', async (req, res) => {
    tempEmployee = false
    if (req.user && req.user.employee) tempEmployee = true;

    res.render('post-event', {
        title: "Post Event",
        user:req.user,
        employee: tempEmployee
    })
})

router.post('/post-event', async (req, res) => {
    tempEmployee = false
    if (req.user && req.user.employee) tempEmployee = true;

    let subject = req.body.subject;
    let description = req.body.description;

    let emailList = []
    await User.find({}, function (err, users) {
        users.forEach(user => {
            emailList.push(user.email);
            console.log(user);
        });
    }).clone();
    console.log(emailList)
    console.log("attempting email sending")
    await notifyEmail(emailList, subject, description).catch(console.error);

    res.render('post-event', {
        title: "Post Event",
        user:req.user,
        employee: tempEmployee,
        success: true
    })
})

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

async function notifyEmail(emailList, subject, description) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: "lewiscapstonefoodbank@gmail.com", 
          pass: "zxcvbnm098",
        },
      });
    console.log(`\n${emailList}\n`);
      let info = await transporter.sendMail({
        from: '"Your Local Foodbank" <lewiscapstonefoodbank@gmail.com>',
        to: emailList.toString(),
        subject: subject, 
        text: description,
        html: `<p>${description}<p/>`, 
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

async function sendMail(emailList, foodItem) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: "lewiscapstonefoodbank@gmail.com", 
          pass: "zxcvbnm098",
        },
      });
    console.log(`\n${emailList}\n`);
      let info = await transporter.sendMail({
        from: '"Your Local Foodbank" <lewiscapstonefoodbank@gmail.com>',
        to: emailList.toString(),
        subject: "New Food Available", 
        text: `Hello,\nWe would like to inform you that ${foodItem.quantity} ${foodItem.title} are available at the ${foodItem.location} location.`,
        html: `<p>Hello,</p><p>Hello,\nWe would like to inform you that ${foodItem.quantity} ${foodItem.title} are available at the ${foodItem.location} location.</p><p>Have a great day!<p/>`, 
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

}

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
            quantity: quantity
        })

        await foodItem.save()
        console.log("added to database")

        let emailList = []
        await User.find({}, function (err, users) {
            users.forEach(user => {
                emailList.push(user.email);
            });
        }).clone();

        await sendMail(emailList, foodItem).catch(console.error);

        await FoodItem.find({}).exec().then(async (foodItems) => {
            res.render('inventory', {
                title: "Inventory",
                user:req.user,
                employee: tempEmployee,
                food: foodItems,
                itemAdded: true
            });
        });

    } catch (error) {
        console.log(error)
        await FoodItem.find({}).exec().then(async (foodItems) => {
            res.render('inventory', {
                title: "Inventory",
                user:req.user,
                employee: tempEmployee,
                food: foodItems,
                itemError: true
            });
        });
    }
});

router.post('/inventoryDelete', async (req, res) => {
    const item = req.body.item;

    await FoodItem.deleteMany({ title: item }, function(error) {
        if (!error) {
            FoodItem.find({}).exec().then(async (foodItems) => {
                res.render('inventory', {
                    title: "Inventory",
                    user:req.user,
                    employee: tempEmployee,
                    food: foodItems,
                    itemDeleted: true
                });
            });        
        }
        else {
            console.log(error);
            res.render('inventory', {
                title: "Inventory",
                user:req.user,
                employee: tempEmployee,
                food: foodItems,
                itemError: true
            });

        }
    })

});



module.exports = router