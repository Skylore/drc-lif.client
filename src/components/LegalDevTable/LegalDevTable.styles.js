import styled from "styled-components";
import { Row } from "antd";
import Table from "antd/es/table";

export const TableContainer = styled(Row)`
	width: 100%;
`;

export const StyledTable = styled(Table)`
	width: 100%;

	.ant-table-thead > tr > th {
		color: black !important;
	}

	.ant-table-pagination.ant-pagination {
		margin: 16px 20px;
	}
`;
