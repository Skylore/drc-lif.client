import React, { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { InfoCircleOutlined } from "@ant-design/icons";
import Col from "antd/es/grid/col";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { ChartBlock, ChartDetails, DetailsButton } from "./Chart.styles";
import monthEnum from "../../enums/month.enum";

function Chart({ years = [], isMain }) {
	const { t } = useTranslation();

	const chartRef = useRef(null);

	const tableData = useSelector(state => (isMain ? state.mainTable : state.detailsTable)) || [];

	useEffect(() => {
		if (tableData && tableData.length) {
			const chart = am4core.create("chartDiv", am4charts.XYChart);

			const totalDataRow = tableData.find(tableRow => tableRow.props.category === "total");

			const data = [];
			const monthValues = Object.values(monthEnum);
			// let prevValue;
			// let prevColor;

			years.forEach(year => {
				monthValues.forEach(month => {
					data.push({
						date: new Date(year, monthValues.indexOf(month) + 1, 0),
						value: totalDataRow[`${month}_${year}`],
						color: am4core.color("#a21f30")
					});

					// prevColor =
					// 	totalDataRow[`${month}_${year}`] >= prevValue
					// 		? am4core.color("#007aa5")
					// 		: am4core.color("#a21f30");
					// prevValue = totalDataRow[`${month}_${year}`];
				});
			});

			chart.data = data;

			chart.zoomOutButton.background.fill = am4core.color("#d6787c");

			const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
			dateAxis.renderer.grid.template.location = 0;
			dateAxis.renderer.axisFills.template.disabled = true;
			dateAxis.renderer.ticks.template.disabled = true;

			const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.tooltip.disabled = true;
			valueAxis.renderer.minWidth = 35;
			valueAxis.renderer.axisFills.template.disabled = true;
			valueAxis.renderer.ticks.template.disabled = true;

			const series = chart.series.push(new am4charts.LineSeries());
			series.dataFields.dateX = "date";
			series.dataFields.valueY = "value";
			series.strokeWidth = 2;
			series.tooltipText = "value: {valueY}";

			series.propertyFields.stroke = "color";

			chart.cursor = new am4charts.XYCursor();

			chart.scrollbarX = new am4core.Scrollbar();

			dateAxis.keepSelection = true;

			chart.logo.height = -15;

			chartRef.current = chart;
		}
	}, [tableData]);

	useEffect(() => {
		return () => {
			if (chartRef.current) {
				chartRef.current.dispose();
			}
		};
	});

	return (
		<>
			<ChartBlock id="chartDiv" />
			<ChartDetails gutter={8} justify="end" align="middle">
				<Col>{t("CHART_BOUNDARIES")}</Col>
				<Col>
					<DetailsButton type="primary" shape="round" icon={<InfoCircleOutlined />} size="small">
						{t("DETAILS")}
					</DetailsButton>
				</Col>
			</ChartDetails>
		</>
	);
}

export default React.memo(Chart);
