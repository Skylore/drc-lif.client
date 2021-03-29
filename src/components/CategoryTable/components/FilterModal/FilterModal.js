import React from "react";
import Checkbox from "antd/es/checkbox";
import List from "antd/es/list";
import { FilterModalContainer } from "./FilterModal.styles";

function FilterModal({ activeYears = [], years, setActiveYears }) {
	return (
		<FilterModalContainer>
			<List
				dataSource={years}
				bordered={false}
				split={false}
				renderItem={year => (
					<List.Item>
						<Checkbox
							checked={activeYears.includes(year)}
							onChange={ev => {
								if (ev.target.checked) {
									setActiveYears(prevYearsState => ({
										...prevYearsState,
										data: [...prevYearsState.data, year].sort((a, b) => a - b)
									}));
								} else {
									setActiveYears(prevYearsState => ({
										...prevYearsState,
										data: prevYearsState.data
											.filter(prevYear => prevYear !== year)
											.sort((a, b) => a - b)
									}));
								}
							}}
						>
							{year}
						</Checkbox>
					</List.Item>
				)}
			/>
		</FilterModalContainer>
	);
}

export default React.memo(FilterModal);
