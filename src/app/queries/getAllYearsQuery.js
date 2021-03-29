export default callback => {
	fetch(`categories/all-years`, {
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
