import { combineReducers } from "redux";
import searchDrawer from "./searchDrawer";
import user from "./user";

const createReducer = asyncReducer =>
	combineReducers({
		searchDrawer,
		user,
		...asyncReducer
	});

export default createReducer;
