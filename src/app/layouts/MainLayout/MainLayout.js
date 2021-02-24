import React, { Suspense } from "react";
import Spin from "antd/es/spin";
import { renderRoutes } from "react-router-config";
import routes from "../../routesConfig";
import Header from "../../../components/Header";
import { ContentLayout } from "./MainLayout.styles";

function MainLayout() {
	return (
		<>
			<Header />
			<ContentLayout>
				<Suspense fallback={<Spin />}>{renderRoutes(routes)}</Suspense>
			</ContentLayout>
		</>
	);
}

export default React.memo(MainLayout);
