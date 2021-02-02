import { combineReducers } from 'redux'

import articlesReducer from './articlesReducer';
import userReducer from './userReducer';

let rootReducer = combineReducers({userReducer, articlesReducer});

export default rootReducer;