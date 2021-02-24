export const UPDATE_DETAILS_TABLE_DATA = "UPDATE_DETAILS_TABLE_DATA";

export default function updateDetailsTableData(payload) {
	return dispatch =>
		dispatch({
			type: UPDATE_DETAILS_TABLE_DATA,
			payload
		});
}
