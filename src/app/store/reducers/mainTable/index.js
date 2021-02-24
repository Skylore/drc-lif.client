// eslint-disable-next-line import/named
import { UPDATE_MAIN_TABLE_DATA } from "../../actions/mainTable";

const initialState = [];

export default function mainTableReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_MAIN_TABLE_DATA:
			return [...action.payload];
		default:
			return state;
	}
}
