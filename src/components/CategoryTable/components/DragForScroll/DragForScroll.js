import React from "react";
import Slider from "antd/es/slider";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { useTranslation } from "react-i18next";
import { DragForScrollContainer } from "./DragForScroll.styles";

function DragForScroll({ tableScroll, handleDragAndScroll }) {
	const { t } = useTranslation();

	return (
		<DragForScrollContainer>
			<Row align="middle" gutter={4}>
				<Col>{t("DRAG_FOR_SCROLL")}</Col>
				<Col flex="auto">
					<Slider value={tableScroll} onChange={handleDragAndScroll} tipFormatter={null} />
				</Col>
			</Row>
		</DragForScrollContainer>
	);
}

export default React.memo(DragForScroll);
