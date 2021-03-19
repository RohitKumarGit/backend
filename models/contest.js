const mongoose = require('mongoose');
const Schema = mongoose.Schema
const {customAlphabet } = require('nanoid')
var nanoid = customAlphabet('ABCDEFGHIJKLMNPOPQRSTUVWXYZ123456789',6)
const id = Schema.Types.ObjectId
const contestSchema = new Schema({
    name : String,
    shortid : {
        type:String,
        default:nanoid
    },
    participants:[{
        type:id,
        ref:"Participant"
    }],
    locations:[{
        type:id,
        ref:"Location"
    }],
    questions :[{
        type:id,
        ref:"Question"
    }],
    start_time:Date,
    end_time:Date
})
module.exports =  mongoose.model("Contest",contestSchema)
