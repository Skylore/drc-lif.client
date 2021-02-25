import React, { useCallback, useState } from "react";
import Col from "antd/es/grid/col";
import { useSelector } from "react-redux";
import { TableContainer, TableControls } from "./CategoryTable.styles";
import YearSelect from "./components/YearSelect";
import DragForScroll from "./components/DragForScroll";
import Table from "./components/Table/Table";
import LegalDevsDrawer from "./components/LegalDevsDrawer/LegalDevsDrawer";

function CategoryTable({ isMain, tableOffset, years, activeYears, setActiveYears }) {
	const tableData = useSelector(state => (isMain ? state.mainTable : state.detailsTable));

	const [legalDevDrawer, setLegalDevDrawer] = useState(false);
	const [legalDevData, setLegalDevData] = useState({
		month: null,
		year: null,
		category: null
	});

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
		(month, year, category) => {
			setLegalDevDrawer(true);
			setLegalDevData({
				month,
				year,
				category
			});
		},
		[setLegalDevDrawer, setLegalDevData]
	);

	const handleLegalDevModalClose = () => {
		setLegalDevDrawer(false);
	};

	return (
		<>
			<TableContainer tableOffset={tableOffset}>
				<LegalDevsDrawer open={legalDevDrawer} close={handleLegalDevModalClose} data={legalDevData} />
				<TableControls justify="space-around" align="middle">
					<Col>
						<YearSelect years={years} activeYears={activeYears} handleYearSelect={handleYearSelect} />
					</Col>
					<Col>
						<DragForScroll />
					</Col>
				</TableControls>
				<Table
					handleLegalDevModalOpen={handleLegalDevModalOpen}
					tableData={tableData}
					activeYears={activeYears}
					tableOffset={tableOffset}
					isMain={isMain}
				/>
			</TableContainer>
		</>
	);
}

export default React.memo(CategoryTable);
