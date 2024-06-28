import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import mainReducer from './reducer/mainReducer';
import { Reducers } from './utils/ReducerUtils';

const PERSIST_CONFIG_KEY = 'root';

const persistConfig = {
    key: PERSIST_CONFIG_KEY,
    storage: AsyncStorage,
    whitelist: [Reducers.app],
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, mainReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
