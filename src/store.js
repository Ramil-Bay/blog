import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducer/rootReducer';

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		  })
		: compose;

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
