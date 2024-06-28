import { ReducerAction, ReducerActionType } from '../utils/ReducerUtils';

export interface AppReducer {
    
}

const INITIAL_STATE: AppReducer = {
    
};

const appReducer = (state: AppReducer = INITIAL_STATE, action: ReducerAction) => {
    switch (action?.type) {
        case ReducerActionType.RESET_APP_PREFERENCES:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default appReducer;
