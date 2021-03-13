import styled from "styled-components";
import { Row } from "antd";
import Divider from "antd/es/divider";
import Tag from "antd/es/tag";
import Button from "antd/es/button";
import Upload from "antd/es/upload";

export const ChipContainer = styled(Row)``;

export const StyledDivider = styled(Divider)`
	margin: 12px 0;
`;

export const StyledTag = styled(Tag)`
	margin: 2px 2px;
`;

export const FullButton = styled(Button)`
	width: 100% !important;
`;

export const FullUpload = styled(Upload)`
	width: 100%;

	& .ant-upload {
		width: 100%;
	}
`;
