const mongoose = require('mongoose');

const cousreSchema = new mongoose.Schema({
    subject:{
        type:String,
        required:true,
        unique:true
    },

    topics:Array

    
})

const Cousre = mongoose.model('Cousre',cousreSchema);

module.exports = Cousre;