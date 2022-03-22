const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClasseSchema = new Schema({
    NomClasse : {
        type: String,
        unique: true
    },
    Description : {
        type: String
    },
   
});

module.exports = mongoose.model('Classe', ClasseSchema);