const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/college_mangement');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to MongoDB"))
db.once('open',function(){
    console.log('connection is Established');
});

module.exports = db;