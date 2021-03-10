import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Menu from "antd/es/menu";
import { Dropdown } from "antd";

export const HeaderContainer = styled.header`
	width: 100%;
	padding: 0 30px;
	margin: 10px 0;
	font-size: 16px;
	border-bottom: 1px solid rgb(240, 240, 240);
`;

export const BackArrow = styled(ArrowLeftOutlined)`
	cursor: pointer;
	transition: 0.4s ease all;

	&:hover {
		color: #1890ff;
	}
`;

export const StyledMenu = styled(Menu)`
	border-bottom: 0 !important;
`;

export const Title = styled.p`
	color: black;
	font-size: 24px;
	margin: 0;
`;

export const StyledDropdown = styled(Dropdown)`
	cursor: pointer;
`;

export const UserName = styled.span`
	padding-right: 8px;
`;
