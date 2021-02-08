import React from "react";

const routes = [
  {
    path: "/details",
    component: React.lazy(() =>
      import("./layouts/CategoryLayout/CategoryLayout")
    ),
    exact: true,
  },
  {
    path: "/",
    component: React.lazy(() => import("./layouts/HomeLayout/HomeLayout")),
  },
];

export default routes;
