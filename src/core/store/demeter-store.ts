import {persistReducer, persistStore} from "redux-persist";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "@D/core/store/features/user-slice";
import {persistConfig, userPersistConfig} from "@D/core/store/config/config";

const reducers = combineReducers({
    userStoreState: persistReducer(userPersistConfig, userReducer),
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const demeterStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(demeterStore);
export type DemeterDispatch = typeof demeterStore.dispatch;
export type DemeterState = ReturnType<typeof demeterStore.getState>;