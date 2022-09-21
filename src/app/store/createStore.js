import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionReducers from "./professions";

const rootReducer = combineReducers({ qualities: qualitiesReducer, professions: professionReducers });
export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
};
