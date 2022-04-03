import { combineReducers } from "redux";
import forums from './forums';
import comments from './comments';
import auth from './auth';

export default combineReducers({ forums, auth, comments });