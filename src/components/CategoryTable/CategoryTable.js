import React, { useCallback, useState } from "react";
import Col from "antd/es/grid/col";
import { useSelector } from "react-redux";
import axios from "axios";
import { message } from "antd";
import useMediaQuery from "use-media-antd-query";
import { TableContainer, TableControls } from "./CategoryTable.styles";
import YearSelect from "./components/YearSelect";
import DragForScroll from "./components/DragForScroll";
import Table from "./components/Table/Table";
import LegalDevsDrawer from "./components/LegalDevsDrawer/LegalDevsDrawer";
import FilterModal from "./components/FilterModal/FilterModal";

function CategoryTable({ isMain, tableOffset, years, activeYears, setActiveYears }) {
	const tableData = useSelector(state => (isMain ? state.mainTable : state.detailsTable));

	const [legalDevDrawer, setLegalDevDrawer] = useState(false);
	const [legalDevData, setLegalDevData] = useState({
		month: null,
		year: null,
		categoryGroup: null,
		legalDevs: []
	});
	const [legalDevDataLoading, setLegalDevDataLoading] = useState(false);

	const colSize = useMediaQuery();

	const handleYearSelect = useCallback(
		year => {
			setActiveYears(prevYears => {
				if (prevYears.includes(year)) {
					return prevYears.filter(y => y !== year);
				}
				return [...prevYears, year];
			});
		},
		[setActiveYears]
	);

	const handleLegalDevModalOpen = useCallback(
		(month, year, categoryGroup, categoryGroupCustomId) => {
			setLegalDevDataLoading(true);

			axios
				.post(`${process.env.REACT_APP_ENDPOINT}/legal-devs/main-table-eval-accumulated`, {
					categoryGroup: categoryGroupCustomId,
					month,
					year: Number(year)
				})
				.then(resp => {
					setLegalDevData(prevState => {
						return {
							...prevState,
							legalDevs: resp.data
						};
					});
					setLegalDevDataLoading(false);
				})
				.catch(err => {
					message.error(err.toString());
				});

			setLegalDevDrawer(true);
			setLegalDevData({
				month,
				year,
				categoryGroup
			});
		},
		[setLegalDevDrawer, setLegalDevData]
	);

	const handleLegalDevModalClose = () => {
		setLegalDevDrawer(false);
	};

	const filterModal = <FilterModal activeYears={activeYears} years={years} setActiveYears={setActiveYears} />;

	return (
		<>
			<TableContainer tableOffset={tableOffset}>
				<LegalDevsDrawer
					open={legalDevDrawer}
					close={handleLegalDevModalClose}
					data={legalDevData}
					isLoading={legalDevDataLoading}
				/>
				{colSize !== "xs" && (
					<TableControls justify="space-around" align="middle">
						<Col>
							<YearSelect years={years} activeYears={activeYears} handleYearSelect={handleYearSelect} />
						</Col>
						<Col>
							<DragForScroll />
						</Col>
					</TableControls>
				)}
				<Table
					handleLegalDevModalOpen={handleLegalDevModalOpen}
					tableData={tableData}
					activeYears={activeYears}
					tableOffset={tableOffset}
					isMain={isMain}
					isMobile={colSize === "xs"}
					filterModal={filterModal}
				/>
			</TableContainer>
		</>
	);
}

export default React.memo(CategoryTable);
