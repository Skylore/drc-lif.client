import React from "react";
import styled from "styled-components";
import { ReactComponent as LongLogoSvg } from "../../../assets/logo-full.svg";
import { ReactComponent as ShortLogoSvg } from "../../../assets/logo-short.svg";

const FullLogoLink = styled.a`
  width: 225px;
  height: 50px;
  display: inline-block;
  margin-top: 5px;

  svg {
    width: 225px;
    height: 50px;
  }

  @media screen and (max-width: 740px) {
    display: none;
  }
`;

const ShortLogoLink = styled.a`
  width: 64px;
  height: 50px;
  display: none;
  margin-top: 5px;

  svg {
    width: 64px;
    height: 50px;
  }

  @media screen and (max-width: 740px) {
    display: inline-block;
  }
`;

const Logo = (props) => {
  return (
    <>
      <FullLogoLink
        {...props}
        target="_blank"
        href={process.env.REACT_APP_EXTERNAL_SITE}
      >
        <LongLogoSvg />
      </FullLogoLink>
      <ShortLogoLink
        {...props}
        target="_blank"
        href={process.env.REACT_APP_EXTERNAL_SITE}
      >
        <ShortLogoSvg />
      </ShortLogoLink>
    </>
  );
};

export default Logo;
