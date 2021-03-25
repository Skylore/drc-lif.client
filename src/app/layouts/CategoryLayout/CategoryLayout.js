import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "querystring";
import { CategoryTableContainer, ChartContainer } from "./CategoryLayout.styles";
import Chart from "../../../components/Chart";
import CategoryTable from "../../../components/CategoryTable/CategoryTable";
import loadChartData from "../../queries/getChartDataQuery";
import loadAllYears from "../../queries/getAllYearsQuery";
import loadActiveYears from "../../queries/getActiveYearsQuery";
import loadDetailsTableData from "../../queries/getDetailsTableDataQuery";

function CategoryLayout() {
	const location = useLocation();

	const { category: customId } = qs.parse(location.search.slice(1));

	const chartRef = useRef(null);

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
	const [chartDataState, setChartDataState] = useState({
		loading: true,
		data: null,
		error: null
	});

	useEffect(() => {
		loadChartData({ customId }, ({ err, data }) => {
			setChartDataState({
				loading: false,
				error: err,
				data
			});
		});
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
			loadDetailsTableData(data, customId, ({ error: tableErrorResp, data: tableDataResp }) => {
				setTableDataState({
					loading: false,
					data: tableDataResp,
					error: tableErrorResp
				});
			});
		});
	}, []);

	if (allYearsState.loading || activeYearsState.loading || tableDataState.loading || chartDataState.loading) {
		return <p>loading</p>;
	}

	if (allYearsState.error || activeYearsState.error || tableDataState.error || chartDataState.error) {
		return (
			<>
				{allYearsState.error && <p>allYearsState.error</p>}
				{activeYearsState.error && <p>activeYearsState.error</p>}
				{tableDataState.error && <p>tableDataState.error</p>}
				{chartDataState.error && <p>chartDataState.error</p>}
			</>
		);
	}

	return (
		<>
			<ChartContainer ref={chartRef}>
				<Chart chartData={chartDataState.data} />
			</ChartContainer>
			<CategoryTableContainer>
				<CategoryTable
					chartRef={chartRef}
					tableData={tableDataState.data}
					years={allYearsState.data}
					activeYears={activeYearsState.data}
					setActiveYears={setActiveYearsState}
				/>
			</CategoryTableContainer>
		</>
	);
}

export default CategoryLayout;
