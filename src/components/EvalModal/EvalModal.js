import React, { useState } from "react";
import Form from "antd/es/form";
import Modal from "antd/es/modal";
import { useTranslation } from "react-i18next";
import Divider from "antd/es/divider";
import Button from "antd/es/button";
import { useHistory, useLocation } from "react-router";
import Descriptions from "antd/es/descriptions";
import Tag from "antd/es/tag";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { message } from "antd";
import categoriesNs from "../../app/i18n/category/constants";
import { WideInputNumber } from "../../app/layouts/AdminUsersLayout/AdminUsersLayout.styles";

function EvalModal({ open, handleFormAction, close, initialValues, evalConfig, handleDeleteEval }) {
	const location = useLocation();
	const history = useHistory();
	const [form] = Form.useForm();
	const { t } = useTranslation();

	const { state: locationState = {} } = location;
	const { legalDev: selectedLegalDev } = locationState;

	const [legalDev, setLegalDev] = useState(selectedLegalDev || (initialValues && initialValues.legalDev));

	const handleFormFinish = () => {
		if (legalDev) {
			form.validateFields().then(() => {
				const value = form.getFieldValue("value");

				handleFormAction({
					value,
					legalDev,
					evalConfig
				});
			});
			handleResetForm();
		} else {
			message.error(t("SELECT_LEGAL_DEV"));
		}
	};

	const handleResetForm = () => {
		close();
		form.resetFields();
		setLegalDev(null);
	};

	const handleSelectLegalDevRedirect = () => {
		history.push({
			pathname: `/admin/legal-devs/select`,
			state: {
				mode: "select",
				evalMode: initialValues ? "edition" : "creation",
				evalConfig,
				value: form.getFieldValue("value"),
				initialValues
			}
		});
	};

	const handleClearLegalDev = () => {
		history.replace();

		setLegalDev(null);
	};

	const modalTitle = `${t(categoriesNs[evalConfig.categoryCustomId])}, ${evalConfig.month} - ${evalConfig.year}`;

	const renderKeywordTags = keywords => {
		return keywords.map((keyword, i) => (
			<Tag key={i} color="geekblue">
				{keyword}
			</Tag>
		));
	};

	return (
		<Modal
			title={modalTitle}
			visible={open}
			onOk={handleFormFinish}
			onCancel={close}
			afterClose={handleResetForm}
			destroyOnClose
			footer={
				<Row wrap justify={initialValues ? "space-between" : "end"}>
					{initialValues && (
						<Button
							type="primary"
							onClick={() => {
								handleDeleteEval();
								close();
							}}
						>
							Delete
						</Button>
					)}
					<Row gutter={10}>
						<Col>
							<Button onClick={close}>Cancel</Button>
						</Col>
						<Button type="primary" onClick={handleFormFinish}>
							OK
						</Button>
					</Row>
				</Row>
			}
		>
			<Form
				name="basic"
				form={form}
				initialValues={{ value: (initialValues && initialValues.value) || locationState.value }}
			>
				<Form.Item label="Value" name="value" rules={[{ required: true, message: "Please input value!" }]}>
					<WideInputNumber />
				</Form.Item>
				<Divider />
				{legalDev ? (
					<Descriptions
						title="Legal Dev"
						bordered
						extra={
							<Row gutter={10}>
								<Col>
									<Button type="primary" onClick={handleClearLegalDev}>
										Delete
									</Button>
								</Col>
								<Col>
									<Button type="primary" onClick={handleSelectLegalDevRedirect}>
										Edit
									</Button>
								</Col>
							</Row>
						}
					>
						<Descriptions.Item label="name" span={3}>
							{legalDev.name}
						</Descriptions.Item>
						<Descriptions.Item label="keywords" span={3}>
							{legalDev.keywords && renderKeywordTags(legalDev.keywords)}
						</Descriptions.Item>
						<Descriptions.Item label="link" span={3}>
							<Button
								type="link"
								block
								onClick={() => {
									window.open(
										`${process.env.REACT_APP_PICTURES_CDN_SPACE}/legal-devs/${legalDev.fileUrl}`,
										"_blank"
									);
								}}
							>
								{legalDev.fileUrl}
							</Button>
						</Descriptions.Item>
					</Descriptions>
				) : (
					<Button type="primary" block onClick={handleSelectLegalDevRedirect}>
						Select Legal Dev
					</Button>
				)}
			</Form>
		</Modal>
	);
}

export default React.memo(EvalModal);
