import { combineReducers } from 'redux';
import { Reducers } from '../utils/ReducerUtils';
import appReducer from './appReducer';
import sessionReducer from './sessionReducer';

const mainReducer = combineReducers({
    [Reducers.app]: appReducer,
    [Reducers.session]: sessionReducer,
});

export default mainReducer;
