<template>
	<div>
		<n-grid x-gap="12" :y-gap="8" :cols="4">
			<template v-for="(item, index) in companyList" :key="index">
				<n-gi span="1">
					<n-card hoverable @click="toDetail(item.id)">
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
		<n-grid x-gap="12" :y-gap="8" :cols="2">
			<n-gi :offset="1">
				<n-pagination
					v-model:page="queryParams.pageNum"
					v-model:page-size="queryParams.pageSize"
					:item-count="total"
					:page-sizes="[10, 20, 30, 40]"
					:on-update:page="updatePage"
					:on-update:page-size="updateSizePage"
				/>
			</n-gi>
		</n-grid>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import { listCompany } from "@/api/admin/company/info";
import { useRouter } from "vue-router";
const router = useRouter();
const total = ref(0);
const companyList = ref<any[]>([]);
const data = reactive<{
	queryParams: any;
}>({
	queryParams: {
		pageNum: 1,
		pageSize: 40
	}
});
const { queryParams } = toRefs(data);
function updatePage(page: number) {
	queryParams.value.pageNum = page;
	console.log("updatePage", queryParams);
	getList();
}
function updateSizePage(pageSize: number) {
	queryParams.value.pageSize = pageSize;
	getList();
}
function getList() {
	listCompany().then(res => {
		companyList.value = res.data.list;
	});
}
const toDetail = (id: any) => {
	router.push("/app/companydetail/" + id);
};
getList();
</script>

<style scoped>
.light-green {
	height: 108px;
	background-color: rgb(0 128 0 / 12%);
}
.green {
	height: 108px;
	background-color: rgb(0 128 0 / 24%);
}
</style>
