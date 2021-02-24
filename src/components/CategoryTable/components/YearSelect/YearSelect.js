import React, { useRef } from "react";
import Button from "antd/es/button";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Year, YearSelectContainer, YearSelectScrollContainer } from "./YearSelect.styles";

function YearSelect({ years, activeYears, handleYearSelect }) {
	const scrollContainer = useRef(null);

	const scroll = offset => {
		scrollContainer.current.scrollLeft += offset;
	};

	const controlsVisible = years.length >= 1;

	return (
		<YearSelectContainer>
			{controlsVisible && (
				<Button shape="circle" icon={<LeftOutlined />} onMouseDown={() => scroll(-80)} size="small" />
			)}
			<YearSelectScrollContainer ref={scrollContainer}>
				{years.map((year, i) => (
					<Year key={i} active={activeYears.includes(year)} onClick={() => handleYearSelect(year)}>
						{year}
					</Year>
				))}
			</YearSelectScrollContainer>
			{controlsVisible && (
				<Button shape="circle" icon={<RightOutlined />} onMouseDown={() => scroll(80)} size="small" />
			)}
		</YearSelectContainer>
	);
}

export default React.memo(YearSelect);
