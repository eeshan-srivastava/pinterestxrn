enum ReducerActionType {
    RESET_APP_PREFERENCES = 'RESET_APP_PREFERENCES',
}

interface ReducerAction {
    type: ReducerActionType;
    payload?: any;
}

const Reducers = {
    app: 'app',
    session: 'session',
};

export { ReducerActionType, type ReducerAction, Reducers };
