const mongoose = require('mongoose')

let Schema = mongoose.Schema;

let userSchema = new Schema({
    category:{type:String,required:true},
    title:{type:String, required:true},
    desc:{type:String, required:true},
    price:{type:Number, required:true}
})

module.exports = mongoose.model("food_items", userSchema)