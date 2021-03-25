import React from "react";
import Tag from "antd/es/tag";
import Button from "antd/es/button";
import { DeleteOutlined, EditOutlined, FileTextOutlined, PlusOutlined } from "@ant-design/icons";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { StyledTable, TableContainer } from "./LegalDevTable.styles";

function LegalDevTable({
	loading,
	legalDevs,
	page,
	perPage,
	columnsActive,
	legalDevsCount,
	setPage,
	setEditLegalDevInitialValues,
	setEditLegalDevModalOpen,
	handleDeleteLegalDev,
	handleSelectLegalDev
}) {
	const columnsSet = [
		{
			title: "name",
			dataIndex: "name",
			key: "name"
		},
		{
			title: "keywords",
			key: "keywords",
			dataIndex: "keywords",
			render: keywords => (
				<>
					{keywords.map(keyword => {
						return (
							<Tag color="geekblue" key={keyword}>
								{keyword}
							</Tag>
						);
					})}
				</>
			)
		},
		{
			title: "file",
			dataIndex: "fileUrl",
			key: "fileUrl",
			align: "center",
			width: 70,
			render: fileUrl => {
				return (
					<Button
						onClick={() => {
							window.open(`${process.env.REACT_APP_PICTURES_CDN_SPACE}/legal-devs/${fileUrl}`, "_blank");
						}}
						type="primary"
						icon={<FileTextOutlined />}
						size="small"
					/>
				);
			}
		},
		{
			title: "select",
			dataIndex: "",
			key: "select",
			align: "center",
			width: 70,
			render: legalDev => {
				return (
					<Button
						onClick={() => {
							handleSelectLegalDev(legalDev);
						}}
						type="primary"
						icon={<PlusOutlined />}
						size="small"
					/>
				);
			}
		},
		{
			title: "action",
			dataIndex: "",
			key: "actions",
			align: "center",
			width: 140,
			render: legalDev => {
				return (
					<Row align="middle" justify="center" gutter={24}>
						<Col>
							<Button
								onClick={() => {
									setEditLegalDevInitialValues(legalDev);
									setEditLegalDevModalOpen(true);
								}}
								type="primary"
								icon={<EditOutlined />}
								size="small"
							/>
						</Col>
						<Col>
							<Button
								onClick={() => handleDeleteLegalDev(legalDev)}
								type="primary"
								icon={<DeleteOutlined />}
								size="small"
							/>
						</Col>
					</Row>
				);
			}
		}
	];
	const columns = columnsSet.filter(column => columnsActive.includes(column.key));

	return (
		<TableContainer>
			<StyledTable
				size="small"
				loading={loading}
				dataSource={legalDevs}
				columns={columns}
				scroll={{ x: "100%", y: "60vh" }}
				bordered
				pagination={{
					current: page,
					pageSize: perPage,
					total: legalDevsCount
				}}
				onChange={({ current }) => setPage(current)}
			/>
		</TableContainer>
	);
}

export default LegalDevTable;
