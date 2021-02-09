import React from "react";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { useTranslation } from "react-i18next";
import { ColLeft, ColRight, HeaderContainer, Title } from "./Header.styles";
import Logo from "../Logo";
import Search from "../Search";
import LanguageSelect from "../LanguageSelect/LanguageSelect";

function Header() {
	const { t } = useTranslation();

	return (
		<HeaderContainer>
			<Row align="middle" justify="center" className="headerSticky">
				<ColLeft>
					<Logo />
				</ColLeft>
				<Col>
					<Title>{t("LEGISLATIVE_FRAMEWORK_INDEX")}</Title>
				</Col>
				<ColRight>
					<Row align="middle" gutter={4}>
						<Col>
							<LanguageSelect />
						</Col>
						<Col>
							<Search />
						</Col>
					</Row>
				</ColRight>
			</Row>
		</HeaderContainer>
	);
}

export default Header;
