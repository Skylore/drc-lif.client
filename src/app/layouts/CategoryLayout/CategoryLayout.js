import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "querystring";
import { useDispatch } from "react-redux";
import axios from "axios";
import updateDetailsTableData from "../../store/actions/detailsTable";
import { CategoryTableContainer, ChartContainer } from "./CategoryLayout.styles";
import Chart from "../../../components/Chart";
import CategoryTable from "../../../components/CategoryTable/CategoryTable";

function CategoryLayout() {
	const location = useLocation();
	const dispatch = useDispatch();

	const { category: customId } = qs.parse(location.search.slice(1));

	const chartRef = useRef();

	const [tableOffset, setTableOffset] = useState(0);
	const [years] = useState([2016, 2017]);
	const [activeYears, setActiveYears] = useState([2016, 2017]);

	useEffect(() => {
		axios
			.post(`${process.env.REACT_APP_ENDPOINT}/categories/details`, {
				years,
				customId
			})
			.then(({ data }) => {
				dispatch(updateDetailsTableData(data));
			});
	});

	useLayoutEffect(() => {
		const { offsetHeight, offsetTop } = chartRef.current;

		setTableOffset(offsetHeight + offsetTop);
	});

	return (
		<>
			<ChartContainer ref={chartRef}>
				<Chart years={years} />
			</ChartContainer>
			<CategoryTableContainer>
				<CategoryTable
					tableOffset={tableOffset}
					years={years}
					activeYears={activeYears}
					setActiveYears={setActiveYears}
				/>
			</CategoryTableContainer>
		</>
	);
}

export default CategoryLayout;
