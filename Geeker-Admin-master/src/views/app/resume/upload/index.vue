<template>
	<div>
		<n-upload multiple directory-dnd action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :max="1">
			<n-upload-dragger>
				<div style="margin-bottom: 12px">
					<n-icon size="48" :depth="3" :component="MdCloudUpload"> </n-icon>
				</div>
				<n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
				<n-p depth="3" style="margin: 8px 0 0"> 请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码 </n-p>
			</n-upload-dragger>
		</n-upload>
	</div>
</template>

<script setup lang="ts">
import { MdCloudUpload } from "@vicons/ionicons4";
</script>

<style scoped></style>
