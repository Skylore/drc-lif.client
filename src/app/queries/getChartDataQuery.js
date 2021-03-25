export default (requestBody, callback) => {
	fetch(`${process.env.REACT_APP_ENDPOINT}/categories/chart`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(requestBody)
	})
		.then(res => res.json())
		.then(chartDataResp => {
			if (chartDataResp && chartDataResp.status === 1) {
				callback({
					err: null,
					data: chartDataResp.chartData
				});
			} else {
				callback({
					err: new Error("chartDataLoadingError"),
					data: null
				});
			}
		});
};
