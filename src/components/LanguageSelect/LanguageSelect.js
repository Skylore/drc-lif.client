import React, { useCallback } from "react";
import Select from "antd/es/select";
import { Option } from "antd/es/mentions";
import i18next from "i18next";

function LanguageSelect() {
	const handleLanguageChange = useCallback(
		async value => {
			await i18next.changeLanguage(value);
		},
		[i18next]
	);

	return (
		<Select defaultValue="en" bordered={false} onChange={handleLanguageChange}>
			<Option value="en">en</Option>
			<Option value="ua">ua</Option>
		</Select>
	);
}

export default React.memo(LanguageSelect);
