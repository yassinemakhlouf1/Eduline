const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseASSchema = new Schema({
    Name : {
        type: String,
       
    },
    Description : {
        type: String
    },
    Domain: {
        type: String,
       
    },
    Chapter : {
        type: String
    },
 

});

module.exports = mongoose.model('courseAS', courseASSchema)