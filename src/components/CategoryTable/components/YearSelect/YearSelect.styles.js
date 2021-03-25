import styled from "styled-components";

export const YearSelectContainer = styled.div`
	display: flex;
	border: 1px solid #a6a6a6;
	padding: 5px 11px;
	border-radius: 34px;
	margin: 0;
	max-width: 300px;
	align-items: center;
`;

export const YearSelectScrollContainer = styled.div`
	display: flex;
	gap: 10px;
	overflow-x: scroll;
	margin: 0 8px;
	-ms-overflow-style: none;
	scrollbar-width: none;
	scroll-behavior: smooth;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const Year = styled.div`
	padding: 2px 11px;
	border-radius: 34px;
	cursor: pointer;
	color: white;
	background-color: ${({ active }) => (active ? "rgb(175 193 247)" : "rgba(166, 166, 166, 0.6)")};
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
`;
