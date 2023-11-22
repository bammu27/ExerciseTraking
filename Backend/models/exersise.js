const mongoose = require('mongoose');

const exersiseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})

const Exersise = mongoose.model('Exersise',exersiseSchema)

module.exports = Exersise