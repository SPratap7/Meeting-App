import { combineReducers } from 'redux';
import meetings from './meeting';
import auth from './auth';

export default combineReducers({ meetings, auth });