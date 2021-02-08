import { combineReducers } from "redux";

const createReducer = (asyncReducer) =>
  combineReducers({
    ...asyncReducer,
  });

export default createReducer;
