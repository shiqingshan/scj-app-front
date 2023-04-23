<template>
	<div>
		<n-grid x-gap="12" :y-gap="8" :cols="4">
			<template v-for="(item, index) in companyList" :key="index">
				<n-gi>
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
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { listCompany } from "@/api/admin/company/info";
import { useRouter } from "vue-router";
const router = useRouter();

const companyList = ref<any[]>([]);

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
