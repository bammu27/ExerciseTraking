const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:6,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        minlength:6,
    }


    },{
        timestamps:true
    }
)

const user = mongoose.model('user',userSchema)

module.exports = user