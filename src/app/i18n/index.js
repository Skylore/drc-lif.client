import rootEn from "./root/en";
import rootUa from "./root/ua";
import categoryEn from "./category/en";
import categoryUa from "./category/ua";
import authEn from "./auth/en";
import authUa from "./auth/ua";
import adminEn from "./admin/en";
import adminUa from "./admin/ua";

export default {
	en: {
		translation: {
			...rootEn,
			...categoryEn,
			...authEn,
			...adminEn
		}
	},
	uk: {
		translation: {
			...rootUa,
			...categoryUa,
			...authUa,
			...adminUa
		}
	}
};
