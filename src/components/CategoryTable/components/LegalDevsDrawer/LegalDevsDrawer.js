import React from "react";
import Drawer from "antd/es/drawer";
import Spin from "antd/es/spin";
import Row from "antd/es/grid/row";
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
	return (
		<Drawer
			title={
				<div>
					<DrawerMainTitle>{data.group}</DrawerMainTitle>
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
			{isLoading ? (
				<Row justify="center">
					<Spin />
				</Row>
			) : (
				<>
					{data.legalDevs.map((legalDev, i) => (
						<LegalDevLink key={i} legalDev={legalDev} />
					))}
				</>
			)}
		</Drawer>
	);
}

export { LegalDevLink };
export default React.memo(LegalDevsDrawer);
