import rootEn from "./root/en";
import rootUa from "./root/ua";
import categoryEn from "./category/en";
import categoryUa from "./category/ua";
import authEn from "./auth/en";
import authUa from "./auth/ua";

export default {
	en: {
		translation: {
			...rootEn,
			...categoryEn,
			...authEn
		}
	},
	uk: {
		translation: {
			...rootUa,
			...categoryUa,
			...authUa
		}
	}
};
