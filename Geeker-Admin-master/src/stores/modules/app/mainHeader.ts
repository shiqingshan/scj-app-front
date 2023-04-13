import { defineStore } from "pinia";

export const useMainHeader = defineStore("mainHeader", {
	state: () => ({
		//头状态 首页 home 职位 job 公司conmpany
		headerState: ""
	})
});
