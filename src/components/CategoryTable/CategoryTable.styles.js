import styled from "styled-components";
import Row from "antd/es/grid/row";

export const TableControls = styled(Row)`
	height: 60px;
	width: 100%;
`;

export const TableContainer = styled(Row)`
	width: 100%;
	height: ${({ tableOffset }) => `calc(100vh - ${tableOffset}px)`};
`;
