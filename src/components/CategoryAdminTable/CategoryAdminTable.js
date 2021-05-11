import React, { useCallback, useState } from "react";
import Col from "antd/es/grid/col";
import useMediaQuery from "use-media-antd-query";
import { TableContainer } from "./CategoryAdminTable.styles";
import { TableControls } from "../CategoryTable/CategoryTable.styles";
import YearSelect from "../CategoryTable/components/YearSelect";
import DragForScroll from "../CategoryTable/components/DragForScroll";
import Table from "../CategoryTable/components/Table/Table";

function CategoryAdminTable({
	years,
	activeYears,
	setActiveYears,
	tableData,
	tableControlsExtensions,
	handleTableRowClick
}) {
	const colSize = useMediaQuery();

	const [tableScroll, setTableScroll] = useState(0);

	const handleYearSelect = useCallback(
		year => {
			setActiveYears(prevState => {
				if (prevState.data.includes(year)) {
					return {
						...prevState,
						data: prevState.data.filter(y => y !== year)
					};
				}
				return {
					...prevState,
					data: [...prevState.data, year].sort()
				};
			});
		},
		[setActiveYears]
	);

	const handleTableScroll = useCallback(
		ev => {
			const { clientWidth, scrollWidth, scrollLeft } = ev.target;

			setTableScroll((scrollLeft / (scrollWidth - clientWidth)) * 100);
		},
		[setTableScroll]
	);

	const handleDragAndScroll = useCallback(
		value => {
			const table = document.getElementsByClassName("ant-table-content")[0];
			const { clientWidth, scrollWidth } = table;

			table.scroll((value / 100) * (scrollWidth - clientWidth), 0);
		},
		[setTableScroll]
	);

	return (
		<>
			<TableContainer tableOffset={250}>
				{colSize !== "xs" && (
					<TableControls justify="space-around" align="middle">
						<Col>
							<YearSelect years={years} activeYears={activeYears} handleYearSelect={handleYearSelect} />
						</Col>
						{tableControlsExtensions.map(control => (
							<Col>{control}</Col>
						))}
						<Col>
							<DragForScroll tableScroll={tableScroll} handleDragAndScroll={handleDragAndScroll} />
						</Col>
					</TableControls>
				)}
				<Table
					tableData={tableData}
					activeYears={activeYears}
					tableOffset={250}
					isMobile={colSize === "xs"}
					filterModal={() => {}}
					handleTableScroll={handleTableScroll}
					handleRowClick={handleTableRowClick}
				/>
			</TableContainer>
		</>
	);
}

export default React.memo(CategoryAdminTable);
