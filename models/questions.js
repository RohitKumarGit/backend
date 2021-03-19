const mongoose = require('mongoose');
const {customAlphabet } = require('nanoid')
var nanoid = customAlphabet('ABCDEFGHIJKLMNPOPQRSTUVWXYZ123456789',6)
const Schema = mongoose.Schema
const id = Schema.Types.ObjectId
const questionSchema = new Schema({
    name :String,
    shorid :{
        type:String,
        default:nanoid
    },
    description:String,
    test_case_input:String,
    test_case_correct_output:String,
    diff:{
        type:Number,
        enum:[0,1,2]
    },
    contest:{
        type:id,
        ref:"Contest"
    }
})
module.exports = mongoose.model("Question",questionSchema)