import mongoose from 'mongoose';
//const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default:false
  },
  Role: {
    type: String,  
  },
  password:{
    type: String,
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  emailToken: {
      type: String
  },
  date_creation: {
      type: Date,
      default: Date.now,
    },
  birth_date: {
    type: Date,  
  },
  name: {
    type: String,
  },
  last_name: {
    type: String,
  },
});
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

export default User;
//module.exports = mongoose.model('User', UserSchema);