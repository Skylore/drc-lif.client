import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CategoryColIconWrapper, CategoryColWrapper, StyledTable } from "./Table.styles";
import monthEnum from "../../../../enums/month.enum";
import categoryIconConstants from "../../constants/categoryIconConstants";
import categoriesNs from "../../../../app/i18n/category/constants";
import monthNs from "../../../../app/i18n/root/constants";

function useCategoryCol() {
	const { t } = useTranslation();

	return {
		title: "Year",
		dataIndex: "props",
		key: "category",
		width: 200,
		fixed: "left",
		ellipsis: {
			showTitle: false
		},
		render: props => {
			const { icon, color, customId } = props;

			return (
				<CategoryColWrapper color={color}>
					<CategoryColIconWrapper>{categoryIconConstants[icon]}</CategoryColIconWrapper>
					{t(categoriesNs[customId])}
				</CategoryColWrapper>
			);
		}
	};
}

function Table({ tableOffset, tableData = [], handleLegalDevModalOpen, activeYears, isMain }) {
	const { t } = useTranslation();
	const categoryCol = useCategoryCol();
	const history = useHistory();

	const [cols, setCols] = useState([categoryCol]);

	useEffect(() => {
		const bufferCols = [];

		activeYears.forEach(year => {
			bufferCols.push({
				title: `${year}`,
				children: Object.values(monthEnum).map(m => ({
					title: t(monthNs[m]),
					dataIndex: `${m}_${year}`,
					key: `${m}_${year}`,
					width: 45,
					align: "center"
				}))
			});
		});

		setCols([categoryCol, ...bufferCols]);
	}, [activeYears, t]);

	return (
		<StyledTable
			tableOffset={tableOffset}
			onRow={(record, rowIndex) => {
				return {
					onClick: event => {
						const { cellIndex } = event.target;

						if (cellIndex) {
							handleLegalDevModalOpen(cellIndex, rowIndex);
						} else if (isMain && !cellIndex && rowIndex !== tableData.length - 1) {
							const { props } = tableData[rowIndex];

							history.push(`/details?category=${props.customId}`);
						}
					}
				};
			}}
			columns={cols}
			dataSource={tableData}
			bordered
			size="small"
			scroll={{ x: "100%" }}
			pagination={false}
		/>
	);
}

export default React.memo(Table);
