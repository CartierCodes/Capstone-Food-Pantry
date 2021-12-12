const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let userSchema = new Schema({
    email:{type:String,required:true},
    password:{type:String, required:true},
    employee:{type:Boolean, required:true}
})

module.exports = mongoose.model("User", userSchema)