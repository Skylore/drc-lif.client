import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import * as am4core from "@amcharts/amcharts4/core";
import { QueryClient, QueryClientProvider } from "react-query";
// eslint-disable-next-line camelcase
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import MainLayout from "./layouts/MainLayout/MainLayout";
import store from "./store";
import "./App.less";

am4core.useTheme(am4themes_animated);

const queryClient = new QueryClient();

function App() {
	return (
		<Provider store={store}>
			<ConfigProvider direction="ltr">
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<MainLayout />
					</BrowserRouter>
				</QueryClientProvider>
			</ConfigProvider>
		</Provider>
	);
}

export default App;
