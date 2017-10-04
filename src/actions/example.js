import _ from 'lodash';

import { Actions } from '../constants/example';

const handleError = (dispatch, err, action) => {
	dispatch({
		type: Actions.APP_ERROR,
		payload: {
			action,
			message: err.message || 'failed',
		},
	});
};

export const example = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: Actions.EXAMPLE_ACTION,
			payload: 'example',
		});
	} catch (err) {
		handleError(dispatch, err, 'example');
	}
};