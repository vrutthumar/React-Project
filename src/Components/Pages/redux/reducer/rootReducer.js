import { combineReducers } from "redux";
import { apiReducer } from "./reducer";
import { simpleReducer } from "./simpleReducer";

export const rootReducer = combineReducers({
    api : apiReducer,
    simple : simpleReducer
})