import React from "react";
import Drawer from "antd/es/drawer";
import { DrawerMainTitle, DrawerSubTitle } from "./LegalDevsDrawer.styles";

function LegalDevsDrawer({ open, close, data }) {
	return (
		<Drawer
			title={
				<div>
					<DrawerMainTitle>{data.category}</DrawerMainTitle>
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
			<p>Some contents...</p>
		</Drawer>
	);
}

export default React.memo(LegalDevsDrawer);
