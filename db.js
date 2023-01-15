const mongoose = require('mongoose')

const url = "mongodb://riyaUser:Cvabs9WRmlqPWFJK@ac-2ibcvdb-shard-00-00.n7kzkmr.mongodb.net:27017,ac-2ibcvdb-shard-00-01.n7kzkmr.mongodb.net:27017,ac-2ibcvdb-shard-00-02.n7kzkmr.mongodb.net:27017/?ssl=true&replicaSet=atlas-b8fock-shard-0&authSource=admin&retryWrites=true&w=majority";

module.exports.connect = () =>{
    mongoose.connect(url)
}