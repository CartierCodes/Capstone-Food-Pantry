const LocalStrategy = require('passport-local').Strategy
const User = require('./models/User')
const bcrypt = require('bcrypt')


function initialize(passport) {
    console.log('Initialized local strategy')
    const authenticateUser = async (email, password, done) => {

        await User.findOne({email: email}).exec().then(async (user) => {
            // console.log(user)
            // console.log(" passport-config 10: User is: " + user)
            if (user == null)
                return done(null, false, {message: "no user found"});
            try {
                // or statement is to check locally
                // console.log("passport-config 16: compare password")
                // console.log("Password: " + password + ", hash: " + user.password)
                if (await bcrypt.compare(password, user.password)) {
                    // console.log("matched no error")
                    return done(null, user)
                } else {
                    return done(null, false, {message: "password is wrong"})
                }
            } catch (e) {
            }
        })
    }

    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user, done) => {
        return done(null, user.email)
    })
    passport.deserializeUser((id, done) => {
        User.findOne({email:id}).lean().exec().then((user) => {
          return done(null, user)
        })
    })
}


module.exports = initialize