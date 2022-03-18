const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    Nom : {
        type: String,
        unique: true
    },
    Description : {
        type: String
    },
   

});

module.exports = mongoose.model('Course', CourseSchema);