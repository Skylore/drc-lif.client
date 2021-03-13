import React, { useCallback, useMemo, useState } from "react";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Button from "antd/es/button";
import { DeleteOutlined, EditOutlined, FileTextOutlined } from "@ant-design/icons";
import Tag from "antd/es/tag";
import { LayoutContainer, StyledTable, TableContainer, TableControls } from "./AdminLegalDevsLayout.styles";
import LegalDevModal from "../../../components/LegalDevModal/LegalDevModal";
import AutoCompleteSearch from "../../../components/AutoCompleteSearch/AutoCompleteSearch";

function AdminLegalDevsLayout() {
	const { t } = useTranslation();

	const perPage = 10;
	const [page, setPage] = useState(1);
	const [keywordSearch, setKeywordSearch] = useState(null);

	const [legalDevsCount, setLegalDevsCount] = useState(0);
	const [legalDevs, setLegalDevs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [createLegalDevModalOpen, setCreateLegalDevModalOpen] = useState(false);
	const [editLegalDevModalOpen, setEditLegalDevModalOpen] = useState(false);
	const [editLegalDevInitialValues, setEditLegalDevInitialValues] = useState(null);

	const handleLoadLegalDevs = () => {
		setLoading(true);

		axios
			.get(`${process.env.REACT_APP_ENDPOINT}/admin/get-legal-devs`, {
				headers: {
					auth: localStorage.getItem("token")
				},
				params: {
					page: page - 1,
					perPage,
					keywordSearch
				}
			})
			.then(({ data }) => {
				if (data && data.legalDevs && data.count) {
					setLegalDevs(data.legalDevs);
					setLegalDevsCount(data.count);
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

	const handleEditLegalDev = legalDev => {
		axios
			.post(
				`${process.env.REACT_APP_ENDPOINT}/admin/update-legal-dev`,
				{
					...legalDev
				},
				{
					headers: {
						auth: localStorage.getItem("token")
					}
				}
			)
			.then(({ data }) => {
				if (data && data.status === 1) {
					handleLoadLegalDevs();
				} else {
					message.error(t("SOMETHING_WRONG"));
				}
			})
			.catch(err => {
				message.error(err.toString());
			});
	};

	const handleDeleteLegalDev = legalDev => {
		axios
			.post(
				`${process.env.REACT_APP_ENDPOINT}/admin/delete-legal-dev`,
				{
					id: legalDev._id
				},
				{
					headers: {
						auth: localStorage.getItem("token")
					}
				}
			)
			.then(({ data }) => {
				if (data && data.status === 1) {
					handleLoadLegalDevs();
				} else {
					message.error(t("SOMETHING_WRONG"));
				}
			})
			.catch(err => {
				message.error(err.toString());
			});
	};

	const handleCreateLegalDev = useCallback(({ name, keywords, fileUrl }) => {
		axios
			.post(
				`${process.env.REACT_APP_ENDPOINT}/admin/create-legal-dev`,
				{
					name,
					keywords,
					fileUrl
				},
				{
					headers: {
						auth: localStorage.getItem("token")
					}
				}
			)
			.then(({ data }) => {
				if (data && data.status === 1) {
					handleLoadLegalDevs();
				} else {
					message.error(t("SOMETHING_WRONG"));
				}
			})
			.catch(err => {
				message.error(err.toString());
			});
	}, []);

	const handleCloseLegalDevModal = useCallback(() => {
		setCreateLegalDevModalOpen(false);
		setEditLegalDevModalOpen(false);
		setEditLegalDevInitialValues(null);
	}, [createLegalDevModalOpen, editLegalDevModalOpen]);

	const handleOpenLegalDevModal = () => {
		setCreateLegalDevModalOpen(true);
	};

	const handleSearchByKeyword = useCallback(keyword => {
		setKeywordSearch(keyword);
	}, []);

	const columns = [
		{
			title: "name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "keywords",
			key: "keywords",
			dataIndex: "keywords",
			render: keywords => (
				<>
					{keywords.map(keyword => {
						return (
							<Tag color="geekblue" key={keyword}>
								{keyword}
							</Tag>
						);
					})}
				</>
			)
		},
		{
			title: "file",
			dataIndex: "fileUrl",
			key: "fileUrl",
			align: "center",
			width: 70,
			render: fileUrl => {
				return (
					<Button
						onClick={() => {
							window.open(`${process.env.REACT_APP_PICTURES_CDN_SPACE}/legal-devs/${fileUrl}`, "_blank");
						}}
						type="primary"
						icon={<FileTextOutlined />}
						size="small"
					/>
				);
			}
		},
		{
			title: "action",
			dataIndex: "",
			key: "x",
			align: "center",
			width: 140,
			render: legalDev => {
				return (
					<Row align="middle" justify="center" gutter={24}>
						<Col>
							<Button
								onClick={() => {
									setEditLegalDevInitialValues(legalDev);
									setEditLegalDevModalOpen(true);
								}}
								type="primary"
								icon={<EditOutlined />}
								size="small"
							/>
						</Col>
						<Col>
							<Button
								onClick={() => handleDeleteLegalDev(legalDev)}
								type="primary"
								icon={<DeleteOutlined />}
								size="small"
							/>
						</Col>
					</Row>
				);
			}
		}
	];

	useMemo(() => {
		handleLoadLegalDevs();
	}, [page, keywordSearch]);

	return (
		<LayoutContainer>
			{editLegalDevInitialValues && (
				<LegalDevModal
					open={editLegalDevModalOpen}
					handleFormAction={handleEditLegalDev}
					close={handleCloseLegalDevModal}
					initialValues={editLegalDevInitialValues}
				/>
			)}
			<LegalDevModal
				open={createLegalDevModalOpen}
				handleFormAction={handleCreateLegalDev}
				close={handleCloseLegalDevModal}
			/>
			<TableControls justify="space-between" align="middle">
				<Col>
					<AutoCompleteSearch handleSelect={handleSearchByKeyword} />
				</Col>
				<Col>
					<Button type="primary" onClick={handleOpenLegalDevModal}>
						Add Legal Dev
					</Button>
				</Col>
			</TableControls>
			<TableContainer>
				<StyledTable
					size="small"
					loading={loading}
					dataSource={legalDevs}
					columns={columns}
					scroll={{ x: "100%", y: "60vh" }}
					bordered
					pagination={{
						current: page,
						pageSize: perPage,
						total: legalDevsCount
					}}
					onChange={({ current }) => setPage(current)}
				/>
			</TableContainer>
		</LayoutContainer>
	);
}

export default AdminLegalDevsLayout;
