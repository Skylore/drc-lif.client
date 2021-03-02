import { combineReducers } from "redux";
import mainTable from "./mainTable";
import detailsTable from "./detailsTable";
import searchDrawer from "./searchDrawer";

const createReducer = asyncReducer =>
	combineReducers({
		mainTable,
		detailsTable,
		searchDrawer,
		...asyncReducer
	});

export default createReducer;
