const express = require("express");
//const { auth } = require("../../frontend/src/firebase");
const router = express.Router();

const answerDB = require("../models/ans");

router.post("/", async (req, res) => {
  try {
        await answerDB
      .create({
        answer: req.body.answer,
        questionId: req.body.questionId,
        user: req.body.user,
       // like: req.body.like,
        //islike: req.body.islike,
       // user: req.body.user,
      })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Answer added successfully",
        });
      })
      .catch((e) => {
        res.status(400).send({
          status: false,
          message: "Bad request",
        });
      });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: "Error while adding answer",
    });
  }
});


router.get('/',async (req, res)=>{
  try{
      await answerDB.aggregate([
          {
              $lookup: {
                  from: "likes", 
                  localField: "_id",
                  foreignField: "answerId",
                  as: "allAnswers"
              }
          }
      ]).exec().then((doc)=>{
          res.status(200).send(doc)
      }).catch((err)=>{
          res.status(500).send({
              status:false,
              message:"Unable to get question details"
          })
      })
  } catch(e){
      res.status(500).send({
          status:false,
          message:"Unexpected error"
      })
  }
})


/* router.put('/', async (req,res)=>{
  try {
    await answerDB
  .create({
    answerId:req
    like: req.body.like,
   // questionId: req.body.questionId,
    //user: req.body.user,
   // like: req.body.like,
    //islike: req.body.islike,
   // user: req.body.user,
  })
  .then(() => {
    res.status(201).send({
      status: true,
      message: "Answer added successfully",
    });
  })
  .catch((e) => {
    res.status(400).send({
      status: false,
      message: "Bad request",
    });
  });
} catch (e) {
res.status(500).send({
  status: false,
  message: "Error while adding answer",
});
}
}) */

module.exports = router;