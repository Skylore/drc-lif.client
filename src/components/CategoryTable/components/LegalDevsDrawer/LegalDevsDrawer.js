import React from "react";
import Drawer from "antd/es/drawer";
import Spin from "antd/es/spin";
import { DrawerMainTitle, DrawerSubTitle, LegalDevStyledLink } from "./LegalDevsDrawer.styles";

const LegalDevLink = React.memo(function LegalDevLink({ legalDev }) {
	return (
		<LegalDevStyledLink
			onClick={() =>
				window.open(`${process.env.REACT_APP_PICTURES_CDN_SPACE}/legal-devs/${legalDev.fileUrl}`, "_blank")
			}
			replace
		>
			{legalDev.name}
		</LegalDevStyledLink>
	);
});

function LegalDevsDrawer({ open, close, data, isLoading }) {
	if (isLoading) {
		return <Spin />;
	}

	return (
		<Drawer
			title={
				<div>
					<DrawerMainTitle>{data.categoryGroup}</DrawerMainTitle>
					<DrawerSubTitle>
						{data.month} - {data.year}
					</DrawerSubTitle>
				</div>
			}
			placement="right"
			onClose={close}
			visible={open}
			getContainer={false}
		>
			{data.legalDevs && data.legalDevs.map((legalDev, i) => <LegalDevLink key={i} legalDev={legalDev} />)}
		</Drawer>
	);
}

export { LegalDevLink };
export default React.memo(LegalDevsDrawer);
