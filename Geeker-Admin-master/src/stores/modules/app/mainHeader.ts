import { defineStore } from "pinia";

export const useMainHeader = defineStore("mainHeader", {
	state: () => ({
		//头状态 首页 home 职位 job 公司conmpany
		headerState: "",
		jobHeader: {
			jobStatus: "",
			jobName: "",
			jobAddr: "",
			jobQualification: "",
			jobEdu: ""
		}
	}),
	getters: {},
	actions: {
		//设置职位头
		setJobHeader(data: any) {
			this.jobHeader = data;
		}
	}
});
