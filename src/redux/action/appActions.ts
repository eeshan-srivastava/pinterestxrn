import { AppReducer } from '../reducer/appReducer';
import { store } from '../store';
import { ReducerActionType } from '../utils/ReducerUtils';

const resetAppPreferences = () => {
    store.dispatch({
        type: ReducerActionType.RESET_APP_PREFERENCES,
    });
};


export default {
    resetAppPreferences,
};
