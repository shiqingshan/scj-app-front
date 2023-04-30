<template>
	<div>
		<h1 class="content-center">热招职位</h1>
		<n-grid x-gap="12" :y-gap="8" :cols="3">
			<template v-for="(item, index) in hotJobList" :key="index">
				<n-gi>
					<n-card hoverable @click="toJobDetail(item.id)">
						<template #header>
							<div>
								<span>{{ item.jobName }}</span>
							</div>
						</template>
						<template #header-extra>
							<div>
								<span color="red">{{ item.jobDetail.jobSalary }}</span>
							</div>
						</template>
						<div>
							<n-space>
								<span>{{ item.jobDetail.jobSalary }}</span>
								<span>{{ item.jobDetail.jobEdu }}</span>
								<span>{{ item.jobDetail.jobQualification }}</span>
							</n-space>
						</div>
						<template #footer>
							<div>
								<span>{{ item.coName }}</span>
							</div>
						</template>
					</n-card>
				</n-gi>
			</template>
		</n-grid>
		<h1 class="content-center">热门企业</h1>

		<n-grid x-gap="12" :y-gap="8" :cols="3">
			<template v-for="(item, index) in hotCompanyList" :key="index">
				<n-gi>
					<n-card hoverable @click="toCompanyDetail(item.id)">
						<template #header>
							<div>
								<span>{{ item.name }}</span>
							</div>
						</template>
						<div>
							<span>{{ item.address }}</span>
						</div>
					</n-card>
				</n-gi>
			</template>
		</n-grid>
	</div>
</template>
<script lang="ts" setup>
import { listHotJobInfo } from "@/api/admin/job/info";
import { listHotCompany } from "@/api/admin/company/info";
import { useRouter } from "vue-router";
import { ref } from "vue";
const hotJobList = ref<any[]>([]);
const hotCompanyList = ref<any[]>([]);

const router = useRouter();

function getHotJobList() {
	listHotJobInfo().then(res => {
		hotJobList.value = res.data;
	});
}
function getHotCompanyList() {
	listHotCompany().then(res => {
		hotCompanyList.value = res.data;
	});
}
function toJobDetail(id: string) {
	router.push("/app/jobdetail/" + id);
}
const toCompanyDetail = (id: any) => {
	router.push("/app/companydetail/" + id);
};
getHotJobList();
getHotCompanyList();
</script>
