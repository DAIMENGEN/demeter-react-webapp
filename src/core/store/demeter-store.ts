import {persistReducer, persistStore} from "redux-persist";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import employeeReducer from "@D/core/store/features/employee-slice";
import {persistConfig, employeePersistConfig} from "@D/core/store/config/config";

const reducers = combineReducers({
    employeeStore: persistReducer(employeePersistConfig, employeeReducer),
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