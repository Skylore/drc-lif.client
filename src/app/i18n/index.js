import rootEn from "./root/en";
import rootUa from "./root/ua";
import categoryEn from "./category/en";
import categoryUa from "./category/ua";

export default {
	en: {
		translation: {
			...rootEn,
			...categoryEn
		}
	},
	uk: {
		translation: {
			...rootUa,
			...categoryUa
		}
	}
};
