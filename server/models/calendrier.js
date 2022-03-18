const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendrierSchema = new Schema({
    idCourse: {
        type: String
    },
    idUser: {
      type: String
  },
      dateC: {
        type: Date,
        
      },
      description: {
        type: String,
      },

});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Calendrier', CalendrierSchema);