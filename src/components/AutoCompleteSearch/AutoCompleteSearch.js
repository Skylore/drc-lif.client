import React, { useCallback, useState } from "react";
import AutoComplete from "antd/es/auto-complete";
import axios from "axios";
import debounce from "lodash.debounce";
import { message } from "antd";
import { useTranslation } from "react-i18next";

function AutoCompleteSearch({ handleSelect }) {
	const { t } = useTranslation();
	const [options, setOptions] = useState([]);

	const handleSearch = search => {
		if (search && search.length > 2) {
			axios
				.post(`${process.env.REACT_APP_ENDPOINT}/legal-devs/keywords-autocomplete`, {
					search
				})
				.then(({ data }) => {
					if (data && data.keywordsAutocomplete) {
						setOptions(
							data.keywordsAutocomplete.map(ac => ({
								label: ac,
								value: ac
							}))
						);
					} else {
						message.error(t("SOMETHING_WRONG"));
					}
				})
				.catch(err => {
					message.error(err.toString());
				});
		} else {
			setOptions([]);
			handleSelect(null);
		}
	};

	const debouncedSearch = useCallback(debounce(handleSearch, 200), [handleSearch]);

	return (
		<AutoComplete
			options={options}
			style={{
				width: 200
			}}
			onSelect={handleSelect}
			onSearch={debouncedSearch}
			placeholder={t("SEARCH_BY_KEYWORDS")}
			allowClear
		/>
	);
}

export default AutoCompleteSearch;
