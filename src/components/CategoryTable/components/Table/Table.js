import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useMediaQuery from "use-media-antd-query";
import { CategoryColIconWrapper, CategoryColWrapper, StyledTable } from "./Table.styles";
import monthEnum from "../../../../enums/month.enum";
import categoryIconConstants from "../../constants/categoryIconConstants";
import categoriesNs from "../../../../app/i18n/category/constants";
import monthNs from "../../../../app/i18n/root/constants";

function useCategoryCol({ filterModal }) {
	const { t } = useTranslation();
	const colSize = useMediaQuery();

	const categoryCol = {
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

	if (colSize === "xs") {
		categoryCol.filterDropdown = filterModal;
	}

	return categoryCol;
}

function Table({ tableOffset, tableData = [], activeYears, handleRowClick, isMobile, filterModal, handleTableScroll }) {
	const { t } = useTranslation();
	const categoryCol = useCategoryCol({ filterModal });

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

	useLayoutEffect(() => {
		const table = document.getElementsByClassName("ant-table-content")[0];

		table.onscroll = handleTableScroll;
	});

	return (
		<StyledTable
			tableOffset={tableOffset}
			isMobile={isMobile}
			onRow={(record, rowIndex) => {
				return {
					onClick: event => {
						handleRowClick(event, record, rowIndex, cols);
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
