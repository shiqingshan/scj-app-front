<template>
	<div>
		<n-drawer display-directive="show" :width="330">
			<n-drawer-content title="主题配置" :native-scrollbar="false"> </n-drawer-content>
		</n-drawer>
		<n-button-group vertical class="fixed top-360px right-14px z-10000 w-42px h-42px !p-0 transition-all duration-300">
			<n-tooltip trigger="hover" placement="left-start">
				<template #trigger>
					<n-button type="primary" @click="toChatTab">
						<template #icon>
							<n-icon :component="IosSend" />
						</template>
					</n-button>
				</template>
				已投递
			</n-tooltip>
			<n-tooltip trigger="hover" placement="left-start">
				<template #trigger>
					<n-button type="primary" @click="toChatTab">
						<template #icon>
							<n-icon :component="MdChatboxes" />
						</template>
					</n-button>
				</template>
				面试
			</n-tooltip>
		</n-button-group>
	</div>
</template>

<script setup lang="ts">
import { IosSend, MdChatboxes } from "@vicons/ionicons4";
import { useRouter } from "vue-router";

const router = useRouter();
function toChatTab() {
	// TODO
	router.push("/app/chat");
}
</script>

<style scoped></style>
