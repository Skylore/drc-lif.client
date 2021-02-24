import { UPDATE_DETAILS_TABLE_DATA } from "../../actions/detailsTable";

const initialState = [];

export default function detailsTableReducer(state = initialState, action) {
	switch (action.type) {
		case UPDATE_DETAILS_TABLE_DATA:
			return [...action.payload];
		default:
			return state;
	}
}
