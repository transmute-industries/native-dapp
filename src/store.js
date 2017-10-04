import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { autoRehydrate } from 'redux-persist';

import reducer from './reducers/index';

export default function configureStore(initialState) {
	return createStore(
		reducer,
		compose(
			autoRehydrate(),
			applyMiddleware(thunk)
		)
	);
}