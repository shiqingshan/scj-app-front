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
			jobEdu: "",
			jobSalary: "",
			id: "",
			openSelectResume: false,
			resumeList: [] as any[]
		},
		jobStatusDicts: [
			{
				value: "0",
				label: "发布中"
			},
			{
				value: "1",
				label: "已下架"
			},
			{
				value: "2",
				label: "待审核"
			},
			{
				value: "3",
				label: "审核不通过"
			}
		]
	}),
	getters: {
		geStatusLabel(state) {
			return state.jobStatusDicts.find((item: any) => item.value == state.jobHeader.jobStatus)?.label;
		}
	},
	actions: {
		//设置职位头
		setJobHeader(data: any) {
			this.jobHeader = data;
		}
	}
});
