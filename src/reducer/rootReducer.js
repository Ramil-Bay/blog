import { combineReducers } from 'redux';

import articlesReducer from './articlesReducer';
import userReducer from './userReducer';
import tagsReducer from './tagsReducer';
import defaultValueReducer from './defaultValueReducer';

const rootReducer = combineReducers({
	userReducer,
	articlesReducer,
	tagsReducer,
	defaultValueReducer,
});

export default rootReducer;
