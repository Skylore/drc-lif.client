import React from "react";
import Modal from "antd/es/modal";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Select from "antd/es/select";
import { Option } from "antd/es/mentions";

function AdminModal({ open, handleFormAction, close, initialValues }) {
	const [form] = Form.useForm();

	const handleFormFinish = () => {
		form.validateFields().then(() => {
			const data = form.getFieldsValue();

			handleFormAction(data);
			close();

			form.resetFields();
		});
	};

	return (
		<Modal title="Create Admin" visible={open} onOk={handleFormFinish} onCancel={close}>
			<Form name="basic" form={form} initialValues={initialValues}>
				<Form.Item
					label="Login"
					name="login"
					rules={[{ required: true, message: "Please input your username!" }]}
				>
					<Input disabled={initialValues} />
				</Form.Item>

				{!initialValues && (
					<Form.Item
						label="Password"
						name="password"
						rules={[{ required: true, message: "Please input your password!" }]}
					>
						<Input.Password />
					</Form.Item>
				)}

				<Form.Item label="Role" name="role" rules={[{ required: true, message: "Please input your role!" }]}>
					<Select>
						<Option value="ADMIN">Admin</Option>
					</Select>
				</Form.Item>

				<Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default AdminModal;
