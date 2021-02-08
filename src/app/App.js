import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import MainLayout from "./layouts/MainLayout/MainLayout";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider direction="ltr">
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
