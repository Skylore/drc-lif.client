import styled from "styled-components";
import { Row } from "antd";
import Table from "antd/es/table";

export const LayoutContainer = styled.div`
	width: 100%;
`;

export const TableContainer = styled(Row)`
	width: 100%;
`;

export const TableControls = styled(Row)`
	padding: 20px 40px;
`;

export const StyledTable = styled(Table)`
	width: 100%;

	.ant-table-thead > tr > th {
		color: black !important;
	}
`;
