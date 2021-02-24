import React from "react";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import qs from "querystring";
import { HomeOutlined } from "@ant-design/icons";
import { ColLeft, ColRight, HeaderContainer, HomeLink, Title } from "./Header.styles";
import Logo from "../Logo";
import Search from "../Search";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import categoriesNs from "../../app/i18n/category/constants";

function Header() {
	const location = useLocation();
	const { t } = useTranslation();

	const { category: customId } = qs.parse(location.search.slice(1));

	return (
		<HeaderContainer>
			<Row align="middle" justify="center" className="headerSticky">
				<ColLeft>
					<Row gutter={16} align="middle">
						<Col>
							<Logo />
						</Col>
						<Col>
							{customId && (
								<Col>
									<HomeLink to="/">
										<HomeOutlined />
									</HomeLink>
								</Col>
							)}
						</Col>
					</Row>
				</ColLeft>
				<Col>
					<Title>{customId ? t(categoriesNs[customId]) : t("LEGISLATIVE_FRAMEWORK_INDEX")}</Title>
				</Col>
				<ColRight>
					<Row align="middle" gutter={6}>
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

export default React.memo(Header);
