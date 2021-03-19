// post question - done
// get partifular question

// judge a question - done
const Questions = require('../models/questions')
const Contest = require('../models/contest')
const Location = require('../models/location')
const Participant = require('../models/participant')
const express = require('express')

const Router = new express.Router()
const access_token = "2f3a16b0e056b8063c35d72833ee2a5c"
const endpoint = "https://5be8fea2.compilers.sphere-engine.com/api/v4/"
Router.post('/submit',async (req,res)=>{
    const question = await Questions.findById(req.body.question_id)
    const participant = await Participant.findById(req.body.pid).populate("curr_location")
    const contest = await Contest.findById(req.body.cid)
    const input = question.test_case_input.trim()
    const output = question.test_case_correct_output.trim()
    const {source,compilerId} = req.body
    try {
        const {data} = await axios.post(endpoint+'submissions?access_token='+access_token,{
            source,
            compilerId,
            input
        })
        const verify = async function(){
            try {
                const resp = await axios.get(endpoint+'submissions/'+data.id+"?access_token="+access_token)
                
                const {executing} = resp.data
            if(executing){
                setInterval(verify,2030)
            }
            else {
                const resp2 = await axios.get(resp.data.result.streams.output.uri)
                const accepted = resp2.data.trim() === output
                const elem = 100/(contest.questions.length-1)
                if(accepted){
                   
                        participant.next_location = participant.curr_location.next_location._id
                        await participant.save()
                }
                res.send({result: resp.data,accepted:resp2.data})
                return
            }
            } catch (error) {
                console.log(error)
                res.send({error:true})
                return 
            }
            
        }
        setTimeout(verify, 2030);
    } catch (error) {
        res.send(error)
    }
    
    
})
Router.post('/',async (req,res)=>{
    try {
        const question = await Questions.create(req.body)
        const location = await Location.findById(req.body.location_id)
        location.questions.push(question._id)
        const contest  = await Contest.findById(question.contest._id)
        await location.save()
        contest.questions.push(question._id)
        await contest.save()
        res.send(question)
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})

Router.get('/',async (req,res)=>{ // working
    try {
        const question = await Questions.findById(req.body.question_id)
        
        res.send(question)
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})
module.exports = Router