import { combineReducers } from 'redux';
import { reducer as exampleReducer } from './example';
import { reducer as transmuteReducer } from './transmute';

export default combineReducers({
    example: exampleReducer,
    transmute: transmuteReducer
});