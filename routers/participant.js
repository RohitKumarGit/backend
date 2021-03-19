const express = require('express')
const Router = new express.Router()
const Participant = require('../models/participant')
const Contest = require('../models/contest')
Router.post("/",async (req,res)=>{ // working
    try {
        
        const participant = await Participant.find({uid:req.body.uid}).populate("contests matches")
        console.log(participant.length)
        if(participant.length){
            res.send({isNew:false,participant:participant[0]})
        }
        else {
            req.body.data.uid = req.body.uid
            
            const newp = await Participant.create(req.body.data)
            // data : name , uid , email
            res.send({isNew:true,newp})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
Router.post('/verify',async (req,res)=>{
    try {
       const pass = true
       // curr location will be set for start point at t=0
       participant.is_on_move = !pass
       const participant = await Participant.findById(req.body.id).populate("next_location")
       const m = participant.next_location
       
       
       if(m.is_last){

        res.send({verified:pass,isLast:true})
        }
        else {
            participant.curr_location = m._id
            await participant.save() 
            res.send({verified:pass,isLast:false})
        }
       
    } catch (error) {
        res.status(400).send(error)
    }
    
})
Router.post('/match',async (req,res)=>{ // working 
    // userid 1 60547e5afcceab50280c7cf3
    // userid 2 60547e53fcceab50280c7cf2
    try {
        const partner = await Participant.findOne({"final_key":req.body.code})
        const curr = await Participant.findById(req.body.id)
        if(partner!=null){
            curr.matches.push(partner._id)
            partner.matches.push(curr._id)
            await curr.save()
            await partner.save()
            res.send({success:true})
        }
        else {
            res.send({success:false})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({success:false})
    }
    
})
module.exports = Router