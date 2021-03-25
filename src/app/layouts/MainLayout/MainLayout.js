import React, { Suspense, useEffect, useState } from "react";
import Spin from "antd/es/spin";
import { message } from "antd";
import { matchRoutes, renderRoutes } from "react-router-config";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import routes from "../../routesConfig";
import RootHeader from "../../../components/Header/RootHeader/RootHeader";
import AdminHeader from "../../../components/Header/AdminHeader/AdminHeader";
import { ContentLayout, SpinContainer } from "./MainLayout.styles";
import SearchDrawer from "../../../components/SearchDrawer/SearchDrawer";
import { setUser } from "../../store/actions/user";

function MainLayout() {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const [matchResult] = matchRoutes(routes, location.pathname);
	const [loading, setLoading] = useState(false);

	const { route = {} } = matchResult;

	const usePreAuthRedirect = () => {
		const { routeName } = route;
		const preAuthUrl = routeName ? `/preauth?forward=${routeName}` : "/preauth";

		history.push(preAuthUrl);
	};

	useEffect(() => {
		if (route.guard) {
			const token = localStorage.getItem("token");

			if (!token) {
				usePreAuthRedirect();
			} else {
				setLoading(true);

				axios
					.post(`${process.env.REACT_APP_ENDPOINT}/auth/me`, {
						token
					})
					.then(({ data }) => {
						if (data.status === 1) {
							dispatch(setUser(data.user));
							setLoading(false);
						} else {
							setLoading(false);
							message.error(t("SOMETHING_WRONG"));
							usePreAuthRedirect();
						}
					})
					.catch(err => {
						const { response } = err;

						if (response && response.data && response.data.error) {
							message.error(response.data.error);
						} else {
							message.error(err.toString());
						}

						setLoading(false);
						usePreAuthRedirect();
					});
			}
		}
	}, []);

	if (loading) {
		return (
			<SpinContainer justify="center" align="middle">
				<Spin />
			</SpinContainer>
		);
	}

	return (
		<>
			{route.header !== "hide" && (route.header === "root" ? <RootHeader /> : <AdminHeader />)}

			<SearchDrawer open />
			<ContentLayout>
				<Suspense fallback={<Spin />}>{renderRoutes(routes)}</Suspense>
			</ContentLayout>
		</>
	);
}

export default React.memo(MainLayout);
