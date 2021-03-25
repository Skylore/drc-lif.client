import React, { useState } from "react";
import Drawer from "antd/es/drawer";
import Divider from "antd/es/divider";
import Tag from "antd/es/tag";
import Modal from "antd/es/modal";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Input from "antd/es/input";
import Button from "antd/es/button";
import Search from "antd/es/input/Search";
import InputNumber from "antd/es/input-number";
import Select from "antd/es/select";
import { Option } from "antd/es/mentions";
import { ClickableTag } from "./AdminDataTableSettingsModal.styles";

function AdminDataTableSettingsModal({
	open,
	close,
	allYears = [],
	activeYears = [],
	handleDeleteEvaluationYear,
	handleDeleteActiveYear,
	handleAddEvaluationYear,
	handleAddActiveYear
}) {
	const [submitModalOpen, setSubmitModalOpen] = useState(false);
	const [modalYear, setModalYear] = useState(null);
	const [evalYearInputVisible, setEvalYearInputVisible] = useState(false);
	const [visibleYearInputVisible, setVisibleYearInputVisible] = useState(false);
	const [evalYear, setEvalYear] = useState(null);
	const [activeYear, setActiveYear] = useState(null);

	const handleModalSubmit = () => {
		handleDeleteEvaluationYear(modalYear);
		handleModalReject();
	};

	const handleModalReject = () => {
		setSubmitModalOpen(false);
		setModalYear(null);
	};

	const handleEvalYearInputSubmit = () => {
		setEvalYearInputVisible(false);
		handleAddEvaluationYear(evalYear);
		setEvalYear(null);
	};

	const handleVisibleYearInputSubmit = () => {
		setVisibleYearInputVisible(false);
		handleAddActiveYear(activeYear);
		setEvalYear(null);
	};

	return (
		<Drawer title="Settings" placement="right" closable={false} onClose={close} visible={open}>
			<p>Evaluation Years:</p>
			{evalYearInputVisible ? (
				<Row>
					<Col flex="100px">
						<InputNumber min={2000} max={2100} size="small" value={evalYear} onChange={setEvalYear} />
					</Col>
					<Col flex="50px">
						<Button size="small" block onClick={handleEvalYearInputSubmit}>
							add
						</Button>
					</Col>
				</Row>
			) : (
				<>
					{allYears.map((year, i) => (
						<Tag
							closable
							onClose={ev => {
								ev.preventDefault();
								setModalYear(year);
								setSubmitModalOpen(true);
							}}
							color="geekblue"
							key={i}
						>
							{year}
						</Tag>
					))}
					<ClickableTag onClick={() => setEvalYearInputVisible(true)}>+</ClickableTag>
				</>
			)}
			<Divider />
			<p>Default Active Years:</p>
			{visibleYearInputVisible ? (
				<Row>
					<Col flex="100px">
						<Select style={{ width: 100 }} onChange={value => setActiveYear(value)} size="small">
							{allYears
								.filter(year => !activeYears.includes(year))
								.map(year => (
									<Option value={year}>{year}</Option>
								))}
						</Select>
					</Col>
					<Col flex="50px">
						<Button size="small" block onClick={handleVisibleYearInputSubmit}>
							add
						</Button>
					</Col>
				</Row>
			) : (
				<>
					{activeYears.map((year, i) => (
						<Tag closable onClose={() => handleDeleteActiveYear(year)} color="geekblue" key={i}>
							{year}
						</Tag>
					))}
					<ClickableTag onClick={() => setVisibleYearInputVisible(true)}>+</ClickableTag>
				</>
			)}
			<Divider />

			<Modal title="Submit" visible={submitModalOpen} onOk={handleModalSubmit} onCancel={handleModalReject}>
				<p>{`Delete ${modalYear} year?`}</p>
			</Modal>
		</Drawer>
	);
}

export default React.memo(AdminDataTableSettingsModal);
