const mongoose = require('mongoose')


const AnswerSchema = new mongoose.Schema({
    answer :String,
    questionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions"
    },
    //questionUrl :String,
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    user:Object,
    like:[
        {
            user: {
                type:mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    

/*     comments: [
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            text:{
                type: String,
            }
        }
    ] */
    //like: Number,
    //islike: Boolean,
    
})


module.exports = mongoose.model("Answers", AnswerSchema);

