export const OPEN_SEARCH_DRAWER = "OPEN_SEARCH_DRAWER";
export const CLOSE_SEARCH_DRAWER = "CLOSE_SEARCH_DRAWER";

export function openSearchDrawer() {
	return dispatch =>
		dispatch({
			type: OPEN_SEARCH_DRAWER,
			payload: true
		});
}

export function closeSearchDrawer() {
	return dispatch =>
		dispatch({
			type: OPEN_SEARCH_DRAWER,
			payload: false
		});
}
