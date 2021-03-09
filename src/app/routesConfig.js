import React from "react";

const routes = [
	{
		path: "/details",
		routeName: "details",
		component: React.lazy(() => import("./layouts/CategoryLayout/CategoryLayout")),
		exact: true
	},
	{
		path: "/preauth",
		routeName: "preauth",
		component: React.lazy(() => import("./layouts/AuthLayout/AuthLayout")),
		exact: true,
		hideHeader: true
	},
	{
		path: "/admin",
		routeName: "admin",
		component: React.lazy(() => import("./layouts/AdminLayout/AdminLayout")),
		exact: true,
		hideHeader: true,
		guard: true
	},
	{
		path: "/",
		component: React.lazy(() => import("./layouts/HomeLayout/HomeLayout"))
	}
];

export default routes;
