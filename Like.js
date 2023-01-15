const express = require('express')
const router = express.Router();

const questionDB = require('../models/like')

router.post('/',  async (req, res)=>{
    console.log(req.body)

    try{
        await likeDB.create({
            answerId: req.body.answerId,
            like: req.body.like,
        }).then(()=>{
            res.status(201).send({
                status: true,
                message: "Question added successfully",
            })
        }).catch((err)=>{
            res.status(400).send({
                status: false,
                meassage: "Connection Failed",
            })
        })
        }catch(e){
            res.status(500).send({
                status:false,
                message: "Error while adding question",
            })
        }
    //}
});


module.exports = router