import { Actions } from '../constants/example';

const initialState = {
	example: null
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {

		case Actions.EXAMPLE_ACTION: {
			return initialState;
		}

		default: {
			return state;
		}
	}
}