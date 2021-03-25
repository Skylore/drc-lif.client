import React from "react";
import ReactDOM from "react-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import App from "./app/App";
import packageJson from "../package.json";
import resources from "./app/i18n";

i18n.use(initReactI18next)
	.init({
		resources,
		lng: "en",
		fallbackLng: "uk"
	})
	.then();

console.log(`Current version is: ${packageJson.version}`);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
