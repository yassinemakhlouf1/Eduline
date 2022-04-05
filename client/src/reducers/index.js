import { combineReducers } from "redux";
import forums from './forums';
import comments from './comments';

export default combineReducers({ forums, comments });