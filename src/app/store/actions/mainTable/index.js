export const UPDATE_MAIN_TABLE_DATA = "UPDATE_MAIN_TABLE_DATA";

export default function updateMainTableData(payload) {
	return dispatch =>
		dispatch({
			type: UPDATE_MAIN_TABLE_DATA,
			payload
		});
}
