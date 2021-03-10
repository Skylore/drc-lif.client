import { combineReducers } from "redux";
import mainTable from "./mainTable";
import detailsTable from "./detailsTable";
import searchDrawer from "./searchDrawer";
import user from "./user";

const createReducer = asyncReducer =>
	combineReducers({
		mainTable,
		detailsTable,
		searchDrawer,
		user,
		...asyncReducer
	});

export default createReducer;
