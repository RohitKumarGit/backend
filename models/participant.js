const mongoose = require('mongoose');
const {customAlphabet } = require('nanoid')
var nanoid = customAlphabet('ABCDEFGHIJKLMNPOPQRSTUVWXYZ123456789',6)
const Schema = mongoose.Schema
const id = Schema.Types.ObjectId
const participantSchema = new Schema({
    name:String,
    email:String,
    uid:String,
    shortid:{
        type:String,
        default:nanoid
    },

    curr_score:{
        type:Number,
        default:0
    },
    contests:[{
        type:id,
        ref:"Contest"
    }],
    next_location:{
        type:id,
        ref:"Location"
    },
    curr_location:{
        type:id,
        ref:"Location"
    },
    is_on_move:{
        type:Boolean,
        default:false
    },
    matches :[{
        type:id,
        ref:"Participant"
    }],
    phone:Number,
    at_final:{
        type:Boolean,
        default:false
    },
    final_key:{
        type:String,
        default:nanoid
    },
})
module.exports = mongoose.model("Participant",participantSchema)