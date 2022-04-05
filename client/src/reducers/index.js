import { combineReducers } from "redux";
import forums from './forums';
import comments from './comments';
import answers from './answers';

export default combineReducers({ forums, comments, answers });