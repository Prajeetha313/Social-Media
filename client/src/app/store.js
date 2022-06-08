import userReducer from '../reducer/userSlice';
import postReducer from '../reducer/postSlice';
import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";

import {
    persistStore,
    persistReducer, 
    REGISTER, 
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key : "root", 
    version : 1, 
    storage, 
};

const rootReducer = combineReducers({
    user : userReducer, 
    post : postReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer : persistedReducer, 
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck : {
                ignoreActions : [REGISTER], 
            }, 
        }),
});

export let persistor = persistStore(store);