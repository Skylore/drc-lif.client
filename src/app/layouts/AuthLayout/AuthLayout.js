import React from "react";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
// eslint-disable-next-line import/named
import { useTranslation } from "react-i18next";
import axios from "axios";
import { message } from "antd";
import qs from "querystring";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { LoginFormContainer, StyledForm } from "./AuthLayout.styles";
import { setUser } from "../../store/actions/user";

function AuthLayout() {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { forward } = qs.parse(location.search.slice(1));

	const handleLogin = formData => {
		axios
			.post(`${process.env.REACT_APP_ENDPOINT}/auth/login`, formData)
			.then(({ data }) => {
				if (data.status === 1) {
					localStorage.setItem("token", data.token);
					dispatch(setUser(data.user));

					history.push(forward ? `/${forward}` : "/");
				} else {
					message.error(t("SOMETHING_WRONG"));
				}
			})
			.catch(err => {
				const { response } = err;

				if (response && response.data && response.data.error) {
					message.error(response.data.error);
				} else {
					message.error(err.toString());
				}
			});
	};

	return (
		<LoginFormContainer align="middle" justify="center">
			<StyledForm onFinish={handleLogin} onFinishFailed={console.log}>
				<Form.Item
					label={t("USERNAME")}
					name="login"
					rules={[{ required: true, message: t("USERNAME_IS_REQUIRED") }]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={t("PASSWORD")}
					name="password"
					rules={[{ required: true, message: t("PASSWORD_IS_REQUIRED") }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						{t("LOGIN")}
					</Button>
				</Form.Item>
			</StyledForm>
		</LoginFormContainer>
	);
}

export default React.memo(AuthLayout);
