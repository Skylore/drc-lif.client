export default callback => {
	fetch(`${process.env.REACT_APP_ENDPOINT}/categories/all-years`, {
		method: "GET"
	})
		.then(res => res.json())
		.then(yearsData => {
			if (yearsData && yearsData.status === 1) {
				callback({
					err: null,
					data: yearsData.years
				});
			} else {
				callback({
					err: new Error("clientAllYearsPropertyError"),
					data: null
				});
			}
		});
};
