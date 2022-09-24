import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionReducers from "./professions";
import usersReducer from "./users";
import commentsReducers from "./comments";

const rootReducer = combineReducers({ qualities: qualitiesReducer, professions: professionReducers, users: usersReducer, comments: commentsReducers });
export function createStore() {
    return configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== "production"
    });
};
