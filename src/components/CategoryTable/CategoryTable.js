import React, { useCallback, useLayoutEffect, useState } from "react";
import Col from "antd/es/grid/col";
import axios from "axios";
import { message } from "antd";
import useMediaQuery from "use-media-antd-query";
import { useHistory } from "react-router";
import { TableContainer, TableControls } from "./CategoryTable.styles";
import YearSelect from "./components/YearSelect";
import DragForScroll from "./components/DragForScroll";
import Table from "./components/Table/Table";
import LegalDevsDrawer from "./components/LegalDevsDrawer/LegalDevsDrawer";
import FilterModal from "./components/FilterModal/FilterModal";

function CategoryTable({ isMain, years, activeYears, setActiveYears, tableData, chartRef }) {
	const history = useHistory();

	const [legalDevDrawer, setLegalDevDrawer] = useState(false);
	const [legalDevData, setLegalDevData] = useState({
		month: null,
		year: null,
		group: null,
		legalDevs: []
	});
	const [legalDevDataLoading, setLegalDevDataLoading] = useState(false);
	const [tableScroll, setTableScroll] = useState(0);
	const [tableOffset, setTableOffset] = useState(0);

	const colSize = useMediaQuery();

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

	const handleLegalDevModalOpen = useCallback(
		(month, year, group, groupId) => {
			setLegalDevDataLoading(true);

			const postUrl = isMain
				? `${process.env.REACT_APP_ENDPOINT}/legal-devs/main-table-eval-accumulated`
				: `${process.env.REACT_APP_ENDPOINT}/legal-devs/details-table-eval`;

			axios
				.post(postUrl, {
					group: groupId,
					month,
					year: Number(year)
				})
				.then(resp => {
					setLegalDevData(prevState => {
						return {
							...prevState,
							legalDevs: isMain ? resp.data : [resp.data].filter(r => r)
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
				group
			});
		},
		[setLegalDevDrawer, setLegalDevData]
	);

	const handleLegalDevModalClose = () => {
		setLegalDevDrawer(false);
	};

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

	const handleRowClick = useCallback((event, record, rowIndex, cols) => {
		const { cellIndex, textContent } = event.target;

		if (rowIndex !== tableData.length - 1) {
			if (textContent && cellIndex) {
				const colGroup = cols[Math.floor((cellIndex - 1) / 12) + 1];
				const cell = colGroup.children[(cellIndex - 1) % 12];

				const [month, year] = cell.dataIndex.split("_");

				handleLegalDevModalOpen(month, year, record.props.category, record.props.customId);
			} else if (!cellIndex && isMain) {
				const { props } = tableData[rowIndex];

				history.push(`/details?category=${props.customId}`);
			}
		}
	}, []);

	useLayoutEffect(() => {
		const { offsetHeight, offsetTop } = chartRef.current;

		setTableOffset(offsetHeight + offsetTop);
	});

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
							<DragForScroll tableScroll={tableScroll} handleDragAndScroll={handleDragAndScroll} />
						</Col>
					</TableControls>
				)}
				<Table
					tableData={tableData}
					activeYears={activeYears}
					tableOffset={tableOffset}
					isMain={isMain}
					isMobile={colSize === "xs"}
					filterModal={filterModal}
					handleTableScroll={handleTableScroll}
					handleRowClick={handleRowClick}
				/>
			</TableContainer>
		</>
	);
}

export default React.memo(CategoryTable);
