export default callback => {
	fetch(`properties/find-one?propertyId=client-active-years`, {
		method: "GET"
	})
		.then(res => res.json())
		.then(activeYearsConfig => {
			if (activeYearsConfig && activeYearsConfig.status === 1) {
				const { config } = activeYearsConfig.property;

				callback({
					err: null,
					data: config.activeYears
				});
			} else {
				callback({
					err: new Error("clientActiveYearsPropertyError"),
					data: null
				});
			}
		});
};
