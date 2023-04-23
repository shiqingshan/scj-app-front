<template>
	<div>
		<el-row>
			<el-col :span="4">
				<h2>公司地址</h2>
				<span>{{ address }}</span>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { useMainHeader } from "@/stores/modules/app/mainHeader";
import { onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import { getCompany } from "@/api/admin/company/info";

const mainHeader = useMainHeader();
const router = useRouter();
mainHeader.headerState = "companydetail";
const address = ref("");
const id = router.currentRoute.value.params.id;
console.log("companyId", id);
getCompany(id).then((res: any) => {
	mainHeader.setCompanyHeader(res.data);
	address.value = res.data.address;
});
onBeforeUnmount(() => {
	console.log("likaicccc");
	mainHeader.$reset();
});
</script>

<style scoped></style>
