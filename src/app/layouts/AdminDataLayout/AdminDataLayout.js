import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Select from "antd/es/select";
import { Option } from "antd/es/mentions";
import { useHistory, useLocation } from "react-router";
import qs from "querystring";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { message } from "antd";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Button from "antd/es/button";
import { SettingOutlined } from "@ant-design/icons";
import { LayoutContainer } from "./AdminDataLayout.styles";
import { categoriesKeys } from "./constants";
import categoryConstants from "../../i18n/category/constants";
import loadAllYears from "../../queries/getAllYearsQuery";
import loadActiveYears from "../../queries/getActiveYearsQuery";
import loadDetailsTableData from "../../queries/getDetailsTableDataQuery";
import { CategoryTableContainer } from "../CategoryLayout/CategoryLayout.styles";
import CategoryAdminTable from "../../../components/CategoryAdminTable/CategoryAdminTable";
import EvalModal from "../../../components/EvalModal/EvalModal";
import AdminDataTableSettingsModal from "../../../components/AdminDataTableSettingsModal/AdminDataTableSettingsModal";

function AdminDataLayout() {
	const location = useLocation();
	const history = useHistory();
	const { t } = useTranslation();

	const { state: locationState = {} } = location;
	const { category: customId = "safety-and-security" } = qs.parse(location.search.slice(1));

	const [evalCreateModalOpen, setEvalCreateModalOpen] = useState(locationState.mode === "creation");
	const [evalEditModalOpen, setEvalEditModalOpen] = useState(locationState.mode === "edition");
	const [editEvalInitialValues, setEditEvalInitialValues] = useState(locationState.initialValues);
	const [evalConfig, setEvalConfig] = useState(locationState.evalConfig);
	const [settingsModalOpen, setSettingsModalOpen] = useState(false);
	const [allYearsState, setAllYearsState] = useState({
		loading: true,
		data: null,
		error: null
	});
	const [activeYearsState, setActiveYearsState] = useState({
		loading: true,
		data: null,
		error: null
	});
	const [tableDataState, setTableDataState] = useState({
		loading: true,
		data: null,
		error: null
	});

	const loading = allYearsState.loading || activeYearsState.loading || tableDataState.loading;

	const handleLoadData = () => {
		loadAllYears(({ err, data }) => {
			setAllYearsState({
				loading: false,
				error: err,
				data
			});
		});
		loadActiveYears(({ err, data }) => {
			setActiveYearsState({
				loading: false,
				error: err,
				data
			});
		});
	};

	useEffect(() => {
		if (activeYearsState.data) {
			loadDetailsTableData(activeYearsState.data, customId, ({ error: tableErrorResp, data: tableDataResp }) => {
				setTableDataState({
					loading: false,
					data: tableDataResp,
					error: tableErrorResp
				});
			});
		}
	}, [activeYearsState.data]);

	const handleEditEval = useCallback(
		({ value, legalDev }) => {
			const { _id: id, year, month } = editEvalInitialValues;

			axios
				.post(
					`${process.env.REACT_APP_ENDPOINT}/admin/update-eval`,
					{
						id,
						value,
						month,
						year: Number(year),
						legalDev: legalDev ? legalDev._id : null
					},
					{
						headers: {
							auth: localStorage.getItem("token")
						}
					}
				)
				.then(({ data }) => {
					if (data && data.status === 1) {
						handleLoadData();
					} else {
						message.error(t("SOMETHING_WRONG"));
					}
				})
				.catch(err => {
					message.error(err.toString());
				});
		},
		[editEvalInitialValues, handleLoadData]
	);

	const handleCreateEval = useCallback(
		({ value, legalDev }) => {
			const { month, year, categoryCustomId } = evalConfig;

			axios
				.post(
					`${process.env.REACT_APP_ENDPOINT}/admin/create-eval`,
					{
						categoryCustomId,
						value,
						month,
						year: Number(year),
						legalDev: legalDev ? legalDev._id : null
					},
					{
						headers: {
							auth: localStorage.getItem("token")
						}
					}
				)
				.then(({ data }) => {
					if (data && data.status === 1) {
						handleLoadData();
					} else {
						message.error(t("SOMETHING_WRONG"));
					}
				})
				.catch(err => {
					message.error(err.toString());
				});
		},
		[evalConfig, handleLoadData]
	);

	const handleDeleteEval = useCallback(() => {
		const { _id: id } = editEvalInitialValues;

		axios
			.post(
				`${process.env.REACT_APP_ENDPOINT}/admin/delete-eval`,
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
					handleLoadData();
				} else {
					message.error(t("SOMETHING_WRONG"));
				}
			})
			.catch(err => {
				message.error(err.toString());
			});
	}, [editEvalInitialValues, handleLoadData]);

	const handleCloseEvalModal = useCallback(() => {
		setEvalCreateModalOpen(false);
		setEvalEditModalOpen(false);
		setEditEvalInitialValues(null);

		history.replace();
	}, [history]);

	const handleOpenEditModal = ({ month, year, categoryCustomId }) => {
		axios
			.get(`${process.env.REACT_APP_ENDPOINT}/evals/find-one`, {
				params: {
					month,
					year,
					categoryCustomId
				}
			})
			.then(({ data }) => {
				if (data && data.status === 1 && data.eval) {
					setEditEvalInitialValues(data.eval);
					setEvalEditModalOpen(true);
				} else {
					message.error(t("SOMETHING_WRONG"));
				}
			})
			.catch(err => {
				message.error(err.toString());
			});
	};

	const handleTableRowClick = (event, record, rowIndex, cols) => {
		const { cellIndex, textContent } = event.target;

		if (tableDataState.data && rowIndex !== tableDataState.data.length - 1) {
			const { customId: categoryCustomId } = record.props;

			const colGroup = cols[Math.floor((cellIndex - 1) / 12) + 1];
			const cell = colGroup.children[(cellIndex - 1) % 12];

			const [month, year] = cell.dataIndex.split("_");

			setEvalConfig({ month, year, categoryCustomId });

			if (textContent) {
				handleOpenEditModal({ month, year, categoryCustomId });
			} else {
				setEvalCreateModalOpen(true);
			}
		}
	};

	const handleSelectCategory = useCallback(value => {
		history.push({
			pathname: location.pathname,
			search: `?category=${value}`
		});
	}, []);

	const handleSettingsModalOpen = useCallback(() => {
		setSettingsModalOpen(true);
	}, [settingsModalOpen]);

	const handleSettingsModalClose = useCallback(() => {
		setSettingsModalOpen(false);
	}, [settingsModalOpen]);

	const handleDeleteEvaluationYear = useCallback(year => {
		axios
			.post(
				`${process.env.REACT_APP_ENDPOINT}/admin/remove-category-evaluation-year`,
				{
					year: Number(year)
				},
				{
					headers: {
						auth: localStorage.getItem("token")
					}
				}
			)
			.then(({ data }) => {
				if (data && data.status === 1) {
					handleLoadData();
				} else {
					message.error(t("SOMETHING_WRONG"));
				}
			})
			.catch(err => {
				message.error(err.toString());
			});
	}, []);

	const handleDeleteActiveYear = useCallback(year => {
		axios
			.post(
				`${process.env.REACT_APP_ENDPOINT}/admin/remove-client-default-active-year`,
				{
					year: Number(year)
				},
				{
					headers: {
						auth: localStorage.getItem("token")
					}
				}
			)
			.then(({ data }) => {
				if (data && data.status === 1) {
					handleLoadData();
				} else {
					message.error(t("SOMETHING_WRONG"));
				}
			})
			.catch(err => {
				message.error(err.toString());
			});
	}, []);

	const handleAddEvaluationYear = useCallback(year => {
		axios
			.post(
				`${process.env.REACT_APP_ENDPOINT}/admin/create-category-evaluation-year`,
				{
					year: Number(year)
				},
				{
					headers: {
						auth: localStorage.getItem("token")
					}
				}
			)
			.then(({ data }) => {
				if (data && data.status === 1) {
					handleLoadData();
				} else {
					message.error(t("SOMETHING_WRONG"));
				}
			})
			.catch(err => {
				message.error(err.toString());
			});
	}, []);

	const handleAddActiveYear = useCallback(year => {
		axios
			.post(
				`${process.env.REACT_APP_ENDPOINT}/admin/add-client-default-active-year`,
				{
					year: Number(year)
				},
				{
					headers: {
						auth: localStorage.getItem("token")
					}
				}
			)
			.then(({ data }) => {
				if (data && data.status === 1) {
					handleLoadData();
				} else {
					message.error(t("SOMETHING_WRONG"));
				}
			})
			.catch(err => {
				message.error(err.toString());
			});
	}, []);

	useEffect(() => {
		handleLoadData();
	}, [customId]);

	useLayoutEffect(() => {
		if (!categoriesKeys.includes(customId)) {
			history.push("/admin");
		}
	});

	if (allYearsState.loading || activeYearsState.loading || tableDataState.loading) {
		return <p>loading</p>;
	}

	if (allYearsState.error || activeYearsState.error || tableDataState.error) {
		return (
			<>
				{allYearsState.error && <p>allYearsState.error</p>}
				{activeYearsState.error && <p>activeYearsState.error</p>}
				{tableDataState.error && <p>tableDataState.error</p>}
			</>
		);
	}

	const categoryKeySelect = (
		<Row gutter={10}>
			<Col>
				<Select
					defaultValue={customId}
					style={{ width: 220 }}
					loading={loading}
					onChange={handleSelectCategory}
				>
					{categoriesKeys.map(categoryKey => (
						<Option value={categoryKey} key={categoryKey}>
							{t(categoryConstants[categoryKey])}
						</Option>
					))}
				</Select>
			</Col>
			<Col>
				<Button type="primary" icon={<SettingOutlined />} onClick={handleSettingsModalOpen} />
			</Col>
		</Row>
	);

	return (
		<LayoutContainer>
			{evalConfig && editEvalInitialValues && (
				<EvalModal
					open={evalEditModalOpen}
					close={handleCloseEvalModal}
					handleFormAction={handleEditEval}
					evalConfig={evalConfig}
					initialValues={editEvalInitialValues}
					handleDeleteEval={handleDeleteEval}
				/>
			)}
			{evalConfig && (
				<EvalModal
					open={evalCreateModalOpen}
					close={handleCloseEvalModal}
					handleFormAction={handleCreateEval}
					evalConfig={evalConfig}
				/>
			)}
			<AdminDataTableSettingsModal
				open={settingsModalOpen}
				close={handleSettingsModalClose}
				allYears={allYearsState.data}
				activeYears={activeYearsState.data}
				handleDeleteEvaluationYear={handleDeleteEvaluationYear}
				handleDeleteActiveYear={handleDeleteActiveYear}
				handleAddEvaluationYear={handleAddEvaluationYear}
				handleAddActiveYear={handleAddActiveYear}
			/>
			<CategoryTableContainer>
				<CategoryAdminTable
					tableData={tableDataState.data}
					years={allYearsState.data}
					activeYears={activeYearsState.data}
					setActiveYears={setActiveYearsState}
					tableControlsExtensions={[categoryKeySelect]}
					handleTableRowClick={handleTableRowClick}
				/>
			</CategoryTableContainer>
		</LayoutContainer>
	);
}

export default AdminDataLayout;
