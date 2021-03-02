import React, { useCallback } from "react";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import qs from "querystring";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import useMediaQuery from "use-media-antd-query";
import { ColLeft, ColRight, HeaderContainer, HomeLink, SearchIcon, Title } from "./Header.styles";
import Logo from "../Logo";
import LanguageSelect from "../LanguageSelect/LanguageSelect";
import categoriesNs from "../../app/i18n/category/constants";
import { openSearchDrawer } from "../../app/store/actions/searchDrawer";

function Header() {
	const location = useLocation();
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const { category: customId } = qs.parse(location.search.slice(1));

	const colSize = useMediaQuery();

	const openSearchDrawerCallback = useCallback(() => {
		dispatch(openSearchDrawer());
	}, [dispatch, openSearchDrawer]);

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
				{colSize !== "xs" && (
					<Col>
						<Title>{customId ? t(categoriesNs[customId]) : t("LEGISLATIVE_FRAMEWORK_INDEX")}</Title>
					</Col>
				)}
				<ColRight>
					<Row align="middle" gutter={6}>
						<Col>
							<LanguageSelect />
						</Col>
						<Col>
							<SearchIcon onClick={openSearchDrawerCallback} />
						</Col>
					</Row>
				</ColRight>
			</Row>
		</HeaderContainer>
	);
}

export default React.memo(Header);
