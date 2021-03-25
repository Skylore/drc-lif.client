export default (activeYears, customId, callback) => {
	fetch(`${process.env.REACT_APP_ENDPOINT}/categories/details`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			years: activeYears,
			customId
		})
	})
		.then(res => res.json())
		.then(tableDataResp => {
			if (tableDataResp && tableDataResp.length) {
				callback({
					err: null,
					data: tableDataResp
				});
			} else {
				callback({
					err: new Error("tableDataLoadingError"),
					data: null
				});
			}
		});
};
