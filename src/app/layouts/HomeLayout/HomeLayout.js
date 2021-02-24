import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { CategoryTableContainer, ChartContainer } from "./HomeLayout.styles";
import Chart from "../../../components/Chart";
import CategoryTable from "../../../components/CategoryTable/CategoryTable";
import updateMainTableData from "../../store/actions/mainTable";

function HomeLayout() {
	const chartRef = useRef(null);
	const [tableOffset, setTableOffset] = useState(0);
	const [years] = useState([2016, 2017]);
	const [activeYears, setActiveYears] = useState([2016, 2017]);

	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.post(`${process.env.REACT_APP_ENDPOINT}/categories/main`, {
				years
			})
			.then(({ data }) => {
				dispatch(updateMainTableData(data));
			});
	});

	useLayoutEffect(() => {
		const { offsetHeight, offsetTop } = chartRef.current;

		setTableOffset(offsetHeight + offsetTop);
	});

	return (
		<>
			<ChartContainer ref={chartRef}>
				<Chart isMain years={years} />
			</ChartContainer>
			<CategoryTableContainer>
				<CategoryTable
					isMain
					tableOffset={tableOffset}
					years={years}
					activeYears={activeYears}
					setActiveYears={setActiveYears}
				/>
			</CategoryTableContainer>
		</>
	);
}

export default HomeLayout;
