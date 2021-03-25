import React, { useCallback, useState } from "react";
import Modal from "antd/es/modal";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import { message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { ChipContainer, FullButton, FullUpload, StyledDivider, StyledTag } from "./LegalDevModal.styles";

function LegalDevModal({ open, handleFormAction, close, initialValues = {} }) {
	const [form] = Form.useForm();
	const [keywords, setKeywords] = useState(initialValues.keywords || []);
	const [legalDev, setLegalDev] = useState(
		initialValues.fileUrl
			? {
					ETag: "0",
					Key: initialValues.fileUrl.split(`${process.env.REACT_APP_PICTURES_CDN_SPACE}/`).join(""),
					Location: initialValues.fileUrl
			  }
			: null
	);

	const uploadProps = {
		name: "file",
		action: `${process.env.REACT_APP_ENDPOINT}/upload`,
		customRequest: async ({ action, file }) => {
			const formData = new FormData();
			formData.append("file", file);

			axios
				.post(action, formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
				.then(({ data }) => {
					if (data && data.Location) {
						setLegalDev(data);
					}
				})
				.catch(() => {
					message.error(`${file.name} file upload failed.`);
				});
		},
		onRemove() {
			setLegalDev(null);
		},
		onChange(info) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		}
	};

	const handleFormFinish = () => {
		const validationFields = ["name"];

		if (!(keywords && keywords.length)) {
			validationFields.push("keyword");
		}

		if (legalDev) {
			form.validateFields(validationFields).then(() => {
				const data = form.getFieldsValue();

				const formActionParams = {
					name: data.name,
					keywords,
					fileUrl: legalDev.Location
				};

				if (initialValues) {
					formActionParams.id = initialValues._id;
				}

				handleFormAction(formActionParams);
				close();

				form.resetFields();
			});
		}
	};

	const handleAddKeyword = () => {
		form.validateFields(["keyword"]).then(() => {
			const keyword = form.getFieldValue("keyword");

			if (keyword) {
				setKeywords(prevKeywords => [...prevKeywords, keyword]);

				form.setFieldsValue({ keyword: "" });
			}
		});
	};

	const handleRemoveKeyword = useCallback(
		keyword => {
			setKeywords(prevKeywords => prevKeywords.filter(prev => prev !== keyword));
		},
		[setKeywords]
	);

	return (
		<Modal title="Create Legal Dev" visible={open} onOk={handleFormFinish} onCancel={close}>
			<Form name="basic" form={form} initialValues={initialValues}>
				<Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input name!" }]}>
					<Input />
				</Form.Item>
				<StyledDivider orientation="left" />
				keywords:
				<ChipContainer>
					{keywords.map((keyword, i) => (
						<StyledTag closable color="geekblue" onClose={() => handleRemoveKeyword(keyword)} key={i}>
							{keyword}
						</StyledTag>
					))}
				</ChipContainer>
				<StyledDivider orientation="left" />
				<Form.Item>
					<Row gutter={8}>
						<Col span={18} flex="auto">
							<Form.Item
								name="keyword"
								noStyle
								rules={[{ required: true, message: "Please input keywords!" }]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col flex="100px">
							<FullButton onClick={handleAddKeyword}>add keyword</FullButton>
						</Col>
					</Row>
				</Form.Item>
				<Form.Item name="legalDev" rules={[{ required: true, message: "Please upload legal dev!" }]}>
					<FullUpload
						{...uploadProps}
						accept="application/pdf"
						fileList={
							legalDev
								? [
										{
											uid: legalDev.Etag,
											name: legalDev.Key,
											url: legalDev.Location,
											status: "done"
										}
								  ]
								: []
						}
					>
						<FullButton disabled={!!legalDev} icon={<UploadOutlined />}>
							Click to Upload
						</FullButton>
					</FullUpload>
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default React.memo(LegalDevModal);
