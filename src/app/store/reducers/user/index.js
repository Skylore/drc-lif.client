import { SET_USER, UNSET_USER } from "../../actions/user";

const initialState = null;

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case UNSET_USER:
		case SET_USER:
			return action.payload;
		default:
			return state;
	}
}
