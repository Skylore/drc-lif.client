import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Button from "antd/es/button";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { LayoutContainer, StyledTable, TableControls } from "./AdminUsersLayout.styles";
import { TableContainer } from "../../../components/CategoryTable/CategoryTable.styles";
import AdminModal from "../../../components/CreateAdminModal/AdminModal";

function AdminUsersLayout() {
	const { t } = useTranslation();

	const user = useSelector(state => state.user);
	const [admins, setAdmins] = useState([]);
	const [loading, setLoading] = useState(false);
	const [createAdminModalOpen, setCreateAdminModalOpen] = useState(false);
	const [editAdminModalOpen, setEditAdminModalOpen] = useState(false);
	const [editAdminInitialValues, setEditAdminInitialValues] = useState(null);

	const handleLoadAdmins = () => {
		setLoading(true);

		axios
			.get(`${process.env.REACT_APP_ENDPOINT}/admin/get-admins`, {
				headers: {
					auth: localStorage.getItem("token")
				}
			})
			.then(({ data }) => {
				if (data && data.admins) {
					setAdmins(data.admins);
				} else {
					message.error(t("SOMETHING_WRONG"));
				}

				setLoading(false);
			})
			.catch(err => {
				message.error(err.toString());

				setLoading(false);
			});
	};

	const handleEditAdmin = admin => {
		axios
			.post(
				`${process.env.REACT_APP_ENDPOINT}/admin/update-admin`,
				{
					...admin
				},
				{
					headers: {
						auth: localStorage.getItem("token")
					}
				}
			)
			.then(({ data }) => {
				if (data && data.status === 1) {
					handleLoadAdmins();
				} else {
					message.error(t("SOMETHING_WRONG"));
				}
			})
			.catch(err => {
				message.error(err.toString());
			});
	};

	const handleDeleteAdmin = admin => {
		const { _id: id } = admin;

		if (user._id !== id) {
			axios
				.post(
					`${process.env.REACT_APP_ENDPOINT}/admin/delete-admin`,
					{
						id
					},
					{
						headers: {
							auth: localStorage.getItem("token")
						}
					}
				)
				.then(({ data }) => {
					if (data && data.status === 1) {
						handleLoadAdmins();
					} else {
						message.error(t("SOMETHING_WRONG"));
					}
				})
				.catch(err => {
					message.error(err.toString());
				});
		}
	};

	const handleCreateAdmin = useCallback(({ login, email, role, password }) => {
		axios
			.post(
				`${process.env.REACT_APP_ENDPOINT}/admin/create-admin`,
				{
					login,
					email,
					role,
					password
				},
				{
					headers: {
						auth: localStorage.getItem("token")
					}
				}
			)
			.then(({ data }) => {
				if (data && data.status === 1) {
					handleLoadAdmins();
				} else {
					message.error(t("SOMETHING_WRONG"));
				}
			})
			.catch(err => {
				message.error(err.toString());
			});
	}, []);

	const handleCloseAdminModal = useCallback(() => {
		setCreateAdminModalOpen(false);
		setEditAdminModalOpen(false);
		setEditAdminInitialValues(null);
	}, [createAdminModalOpen, editAdminModalOpen]);

	const handleOpenAdminModal = () => {
		setCreateAdminModalOpen(true);
	};

	const columns = [
		{
			title: "id",
			dataIndex: "_id",
			key: "id"
		},
		{
			title: "login",
			dataIndex: "login",
			key: "login"
		},
		{
			title: "role",
			dataIndex: "role",
			key: "role"
		},
		{
			title: "email",
			dataIndex: "email",
			key: "email"
		},
		{
			title: "Action",
			dataIndex: "",
			key: "x",
			align: "center",
			width: 140,
			render: el => {
				return (
					<Row align="middle" justify="center" gutter={24}>
						<Col>
							<Button
								onClick={() => {
									console.log(el);
									setEditAdminInitialValues(el);
									setEditAdminModalOpen(true);
								}}
								type="primary"
								icon={<EditOutlined />}
								size="small"
							/>
						</Col>
						{el._id !== user._id && (
							<Col>
								<Button
									onClick={() => handleDeleteAdmin(el)}
									type="primary"
									icon={<DeleteOutlined />}
									size="small"
								/>
							</Col>
						)}
					</Row>
				);
			}
		}
	];

	useEffect(() => {
		handleLoadAdmins();
	}, []);

	return (
		<LayoutContainer>
			{editAdminInitialValues && (
				<AdminModal
					open={editAdminModalOpen}
					handleFormAction={handleEditAdmin}
					close={handleCloseAdminModal}
					initialValues={editAdminInitialValues}
				/>
			)}
			<AdminModal
				open={createAdminModalOpen}
				handleFormAction={handleCreateAdmin}
				close={handleCloseAdminModal}
			/>
			<TableControls justify="end">
				<Col>
					<Button type="primary" onClick={handleOpenAdminModal}>
						Add Admin
					</Button>
				</Col>
			</TableControls>
			<TableContainer>
				<StyledTable
					loading={loading}
					dataSource={admins}
					columns={columns}
					scroll={{ x: "100%", y: "60vh" }}
					bordered
				/>
			</TableContainer>
		</LayoutContainer>
	);
}

export default AdminUsersLayout;
