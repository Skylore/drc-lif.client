import styled from "styled-components";
import Col from "antd/es/grid/col";

export const HeaderContainer = styled.header`
	background: #fff;
	width: 100%;
	height: 60px;

	.headerSticky {
		background: #fff;
		height: 60px;
		position: fixed;
		width: 100%;
		border-bottom: 2px solid rgb(162 31 48);
		top: 0;
		left: 0;
		animation: moveDown 0.5s ease-in-out;
	}

	@keyframes moveDown {
		from {
			transform: translateY(-5rem);
		}
		to {
			transform: translateY(0rem);
		}
	}
`;

export const Title = styled.h2`
	color: #007aa5;
	font-weight: 300;
`;

export const ColLeft = styled(Col)`
	position: absolute;
	left: 5px;
`;

export const ColRight = styled(Col)`
	position: absolute;
	right: 15px;
`;
