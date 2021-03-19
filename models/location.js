const mongoose = require('mongoose');
const {customAlphabet } = require('nanoid')
var nanoid = customAlphabet('ABCDEFGHIJKLMNPOPQRSTUVWXYZ123456789',6)
const Schema = mongoose.Schema
const id = Schema.Types.ObjectId
const locationSchema = new mongoose.Schema({
    lat:Schema.Types.Decimal128,
    lng:Schema.Types.Decimal128,
    questions :[{
        type:id,
        ref:"Question"
    }],
    shortid:{
        type:String,
        default:nanoid
    },
    contest:{
        type:id,
        ref:"Contest"
    },
    next_location:{
        type:id,
        ref:"Location"
    },
    is_last:{
        type:Boolean,
        default:false
    }
})
module.exports =  mongoose.model("Location",locationSchema)
