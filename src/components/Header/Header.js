import React from "react";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { SearchOutlined } from "@ant-design/icons";
// eslint-disable-next-line import/named
import { ColLeft, ColRight, HeaderContainer, Title } from "./Header.styles";
import Logo from "../Logo";
import Search from "../Search";

function Header() {
  return (
    <HeaderContainer>
      <Row align="middle" justify="center" className="headerSticky">
        <ColLeft>
          <Logo />
        </ColLeft>
        <Col>
          <Title>Legislative Framework Index</Title>
        </Col>
        <ColRight>
          <Search />
        </ColRight>
      </Row>
    </HeaderContainer>
  );
}

export default Header;
