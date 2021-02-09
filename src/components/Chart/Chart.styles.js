import styled from "styled-components";
import Row from "antd/es/grid/row";
import Button from "antd/es/button";

export const ChartBlock = styled.div`
	width: 95%;
	height: 220px;
	margin-left: 2.5%;
	overflow-y: hidden;
`;

export const ChartDetails = styled(Row)`
	padding-right: 10px;
	color: #a6a6a6;
	margin-bottom: 5px;
	margin-top: -15px;
`;

export const DetailsButton = styled(Button)`
	background-color: rgba(0, 0, 0, 0);
	border: 0;
	box-shadow: none;
	color: #a6a6a6;
	text-shadow: none;

	$:hover: {
		background-color: #007aa5;
	}
`;
