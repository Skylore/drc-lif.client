// eslint-disable-next-line import/named
import { OPEN_SEARCH_DRAWER, CLOSE_SEARCH_DRAWER } from "../../actions/searchDrawer";

const initialState = false;

export default function searchDrawerReducer(state = initialState, action) {
	switch (action.type) {
		case OPEN_SEARCH_DRAWER:
		case CLOSE_SEARCH_DRAWER:
			return action.payload;
		default:
			return state;
	}
}
