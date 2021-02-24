import { combineReducers } from "redux";
import mainTable from "./mainTable";
import detailsTable from "./detailsTable";

const createReducer = asyncReducer =>
	combineReducers({
		mainTable,
		detailsTable,
		...asyncReducer
	});

export default createReducer;
