import { ReducerAction, ReducerActionType } from '../utils/ReducerUtils';

export interface SessionReducer {}

const INITIAL_STATE: SessionReducer = {};

const sessionReducer = (state: SessionReducer = INITIAL_STATE, action: ReducerAction) => {
    switch (action?.type) {
        case ReducerActionType.RESET_APP_PREFERENCES:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default sessionReducer;
