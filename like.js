const mongoose = require('mongoose')


const LikeSchema = new mongoose.Schema({
    answerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answers",
    },
    like:[
        {
            user: {
                type:mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    
})


module.exports = mongoose.model("Likes", LikeSchema);

