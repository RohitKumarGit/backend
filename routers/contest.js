const express = require('express')
const Router = new express.Router()
const Contest  = require('../models/contest')
const Participant = require('../models/participant')
Router.post('/',async (req,res)=>{ // working
    try {
        const contest = await Contest.create(req.body)
        res.send(contest)
    } catch (error) {
        res.send(error)
    }
})
Router.post('/addp',async (req,res)=>{ // working
    try {
        // cid 6054812501f4a999494fccd2
        const contest = await Contest.findById(req.body.cid)
        const pt = await Participant.findOne({email:req.body.email})
        pt.next_location = contest.locations[0]
      //  console.log(contest)
        contest.participants.push(pt._id)
        pt.contests.push(contest._id)
      //  console.log(contest)
        await pt.save()
        await contest.save()
        res.send(contest)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})
module.exports = Router