import styled from "styled-components";
import Table from "antd/es/table";

export const StyledTable = styled(Table)`
	height: ${({ tableOffset }) => `calc(100vh - 60px - ${tableOffset}px)`} !important;

	& td.ant-table-cell {
		height: ${({ tableOffset }) => `calc((100vh - 60px - ${tableOffset}px - 80px) / 9)`} !important;
	}

	& td.ant-table-cell {
		padding: 5.5px !important;
	}

	& tr > td:nth-child(12n + 1),
	tr:nth-child(2) > th:nth-child(12n) {
		border-right: 1px solid rgb(138, 138, 138) !important;
	}

	& tr > td:last-child {
		border-right: 0 !important;
	}

	& tr:first-child > th {
		border-right: 1px solid rgb(138, 138, 138) !important;
	}

	& tr:first-child > th:last-child,
	tr:nth-child(2) > th:last-child {
		border-right: 0 !important;
	}

	& tr:last-child > td {
		border-top: 1px solid rgb(138, 138, 138) !important;
	}

	& td.ant-table-cell:hover {
		background-color: rgb(175 193 247) !important;
	}

	.ant-table-tbody > tr > td:first-child:hover {
		background-color: white !important;
	}

	.ant-table-tbody > tr > td {
		transition: none;
		cursor: pointer;
	}

	& th.ant-table-cell {
		color: black !important;
	}
`;

export const CategoryColWrapper = styled.span`
	color: ${({ color }) => color};
`;

export const CategoryColIconWrapper = styled.span`
	margin: 0 5px;
`;
