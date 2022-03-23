import { combineReducers } from "redux";
import forums from './forums';
import auth from './auth';

export default combineReducers({ forums, auth });