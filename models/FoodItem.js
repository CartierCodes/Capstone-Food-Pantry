const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let userSchema = new Schema({
    title:{type:String, required:true},
    location:{type:String,required:true},
    category:{type:String,required:true},
    quantity:{type:String, required:true}
})

module.exports = mongoose.model("food_items", userSchema)