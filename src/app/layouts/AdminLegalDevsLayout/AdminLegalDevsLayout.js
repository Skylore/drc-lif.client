import React, { useCallback, useMemo, useState } from "react";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Col from "antd/es/grid/col";
import Button from "antd/es/button";
import { useHistory, useLocation } from "react-router";
import { LayoutContainer, TableControls } from "./AdminLegalDevsLayout.styles";
import LegalDevModal from "../../../components/LegalDevModal/LegalDevModal";
import AutoCompleteSearch from "../../../components/AutoCompleteSearch/AutoCompleteSearch";
import LegalDevTable from "../../../components/LegalDevTable/LegalDevTable";

function AdminLegalDevsLayout() {
	const { t } = useTranslation();
	const { state: locationState = {} } = useLocation();
	const history = useHistory();

	const selectMode = locationState.mode === "select";

	const perPage = 10;
	const [page, setPage] = useState(1);
	const [keywordSearch, setKeywordSearch] = useState(null);

	const [legalDevsCount, setLegalDevsCount] = useState(0);
	const [legalDevs, setLegalDevs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [createLegalDevModalOpen, setCreateLegalDevModalOpen] = useState(false);
	const [editLegalDevModalOpen, setEditLegalDevModalOpen] = useState(false);
	const [editLegalDevInitialValues, setEditLegalDevInitialValues] = useState(null);

	const activeColumns = selectMode
		? ["name", "keywords", "fileUrl", "select"]
		: ["name", "keywords", "fileUrl", "actions"];

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
				if (data && data.legalDevs) {
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

	const handleSelectLegalDev = legalDev => {
		history.push({
			pathname: "/admin",
			state: {
				legalDev,
				evalConfig: locationState.evalConfig,
				mode: locationState.evalMode,
				value: locationState.value,
				initialValues: locationState.initialValues
			}
		});
	};

	const handleOpenLegalDevModal = () => {
		setCreateLegalDevModalOpen(true);
	};

	const handleSearchByKeyword = useCallback(keyword => {
		setKeywordSearch(keyword);
	}, []);

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
				{!selectMode && (
					<Col>
						<Button type="primary" onClick={handleOpenLegalDevModal}>
							Add Legal Dev
						</Button>
					</Col>
				)}
			</TableControls>
			<LegalDevTable
				loading={loading}
				legalDevs={legalDevs}
				page={page}
				perPage={perPage}
				columnsActive={activeColumns}
				legalDevsCount={legalDevsCount}
				setPage={setPage}
				setEditLegalDevInitialValues={setEditLegalDevInitialValues}
				setEditLegalDevModalOpen={setEditLegalDevModalOpen}
				handleDeleteLegalDev={handleDeleteLegalDev}
				handleSelectLegalDev={handleSelectLegalDev}
			/>
		</LayoutContainer>
	);
}

export default AdminLegalDevsLayout;
