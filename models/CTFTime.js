const mongoose = require('mongoose')

let CTFTimeSchema = new mongoose.Schema({
    name: String,
    logo: String,
    description: String,
    point:Number,
    numbers: Number,
    format: String,
    weight:Number,
    start:Date,
    duration: Number
});
module.exports = mongoose.model('CTFTime', CTFTimeSchema)