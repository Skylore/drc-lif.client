export const SET_USER = "SET_USER";
export const UNSET_USER = "UNSET_USER";

export function setUser(payload) {
	return dispatch =>
		dispatch({
			type: SET_USER,
			payload
		});
}

export function unsetUser() {
	return dispatch =>
		dispatch({
			type: UNSET_USER,
			payload: null
		});
}
