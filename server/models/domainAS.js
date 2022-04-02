const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domainASSchema = new Schema({
    Name : {
        type: String,
       
    },
    Description : {
        type: String
    },
 

});

module.exports = mongoose.model('domainAS', domainASSchema)