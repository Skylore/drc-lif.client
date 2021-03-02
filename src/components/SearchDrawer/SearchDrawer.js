import React, { useCallback, useState } from "react";
import { Drawer, Input } from "antd";
import message from "antd/es/message";
import { useTranslation } from "react-i18next";
import Spin from "antd/es/spin";
import Empty from "antd/es/empty";
import debounce from "lodash.debounce";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LegalDevLink } from "../CategoryTable/components/LegalDevsDrawer";
import { SpinContainer } from "./SearchDrawer.styles";
import { closeSearchDrawer } from "../../app/store/actions/searchDrawer";

function ContentDataHOC(props) {
	const { data, loading } = props;
	const { t } = useTranslation();

	if (loading) {
		return (
			<SpinContainer justify="center">
				<Spin />
			</SpinContainer>
		);
	}

	if (!loading && (!data || (data && !data.length))) {
		return <Empty description={t("EMPTY")} />;
	}

	return props.children;
}

function SearchDrawer() {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const isOpen = useSelector(state => state.searchDrawer);

	const closeDrawer = useCallback(() => {
		dispatch(closeSearchDrawer());
	}, [dispatch, closeSearchDrawer]);

	const searchByKeyword = ev => {
		const { value } = ev.target;
		setLoading(true);

		axios
			.post(`${process.env.REACT_APP_ENDPOINT}/legal-devs/find-by-keyword`, {
				keyword: value
			})
			.then(resp => {
				setData(resp.data);
				setLoading(false);
			})
			.catch(err => {
				message.error(err.toString());
				setLoading(false);
			});
	};

	const delayedQuery = useCallback(debounce(searchByKeyword, 350), [searchByKeyword]);

	return (
		<Drawer
			title={<Input placeholder={t("SEARCH")} onChange={delayedQuery} />}
			placement="right"
			closable={false}
			onClose={closeDrawer}
			visible={isOpen}
		>
			<ContentDataHOC loading={loading} data={data}>
				{data.map((legalDev, i) => (
					<LegalDevLink key={i} legalDev={legalDev} />
				))}
			</ContentDataHOC>
		</Drawer>
	);
}

export default SearchDrawer;
