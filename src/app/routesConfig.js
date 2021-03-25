import React from "react";

const routes = [
	{
		path: "/details",
		routeName: "details",
		component: React.lazy(() => import("./layouts/CategoryLayout/CategoryLayout")),
		exact: true,
		header: "root",
		sidebar: "hide"
	},
	{
		path: "/preauth",
		routeName: "preauth",
		component: React.lazy(() => import("./layouts/AuthLayout/AuthLayout")),
		exact: true,
		header: "hide",
		sidebar: "hide"
	},
	{
		path: "/admin",
		routeName: "admin",
		menuKey: "data",
		component: React.lazy(() => import("./layouts/AdminDataLayout/AdminDataLayout")),
		exact: true,
		header: "admin",
		sidebar: "admin",
		guard: true
	},
	{
		path: "/admin/users",
		routeName: "admin",
		menuKey: "users",
		component: React.lazy(() => import("./layouts/AdminUsersLayout/AdminUsersLayout")),
		exact: true,
		header: "admin",
		sidebar: "admin",
		guard: true
	},
	{
		path: "/admin/legal-devs",
		routeName: "admin",
		menuKey: "legal-devs",
		component: React.lazy(() => import("./layouts/AdminLegalDevsLayout/AdminLegalDevsLayout")),
		exact: true,
		header: "admin",
		sidebar: "admin",
		guard: true
	},
	{
		path: "/admin/legal-devs/select",
		routeName: "admin",
		menuKey: "legal-devs",
		component: React.lazy(() => import("./layouts/AdminLegalDevsLayout/AdminLegalDevsLayout")),
		exact: true,
		header: "hide",
		sidebar: "admin",
		guard: true
	},
	{
		path: "/",
		component: React.lazy(() => import("./layouts/HomeLayout/HomeLayout")),
		header: "root",
		sidebar: "hide"
	}
];

export default routes;
