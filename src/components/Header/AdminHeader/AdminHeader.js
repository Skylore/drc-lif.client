import React from "react";
import { useHistory, useLocation } from "react-router";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Menu from "antd/es/menu";
import { FileOutlined, UsergroupAddOutlined, DesktopOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { matchRoutes } from "react-router-config";
import Avatar from "antd/es/avatar";
// eslint-disable-next-line import/named
import Divider from "antd/es/divider";
import { useDispatch, useSelector } from "react-redux";
import { BackArrow, HeaderContainer, StyledDropdown, StyledMenu, Title, UserName } from "./AdminHeader.styles";
import routes from "../../../app/routesConfig";
import { unsetUser } from "../../../app/store/actions/user";

function AdminHeader() {
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();

	const { login: username } = useSelector(({ user }) => user || {});

	const [matchResult] = matchRoutes(routes, location.pathname);
	const { route = {} } = matchResult;

	const handleExit = () => {
		localStorage.removeItem("token");
		dispatch(unsetUser());

		window.location.reload();
	};

	return (
		<HeaderContainer>
			<Row align="middle" justify="space-between">
				<Col>
					<Row align="middle" gutter={30}>
						<Col>
							<BackArrow
								onClick={() => {
									history.push("/");
								}}
							/>
						</Col>
						<Col>
							<Title>Admin</Title>
						</Col>
					</Row>
				</Col>
				<Col>
					<Row align="middle" gutter={24}>
						<Col>
							<StyledMenu
								onClick={({ key }) => {
									if (key === "data") {
										history.push("/admin");
									} else {
										history.push(`/admin/${key}`);
									}
								}}
								selectedKeys={[route.menuKey || "data"]}
								mode="horizontal"
							>
								<Menu.Item key="data" icon={<DesktopOutlined />}>
									Data
								</Menu.Item>
								<Menu.Item key="users" icon={<UsergroupAddOutlined />}>
									Users
								</Menu.Item>
								<Menu.Item key="legal-devs" icon={<FileOutlined />}>
									Legal Devs
								</Menu.Item>
							</StyledMenu>
						</Col>
						{username && (
							<>
								<Divider type="vertical" />
								<Col>
									<UserName>{username}</UserName>
									<StyledDropdown
										overlay={
											<Menu>
												<Menu.Item onClick={handleExit} danger>
													exit
												</Menu.Item>
											</Menu>
										}
									>
										<Avatar icon={<UserOutlined />} />
									</StyledDropdown>
								</Col>
							</>
						)}
					</Row>
				</Col>
			</Row>
		</HeaderContainer>
	);
}

export default AdminHeader;
