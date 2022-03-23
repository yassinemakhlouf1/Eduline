const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterASSchema = new Schema({
    Name : {
        type: String,
       
    },
    Description : {
        type: String
    },
 

});

module.exports = mongoose.model('chapterAS', chapterASSchema)