// * Menu
declare namespace Menu {
	interface MenuOptions {
		path: string;
		name: string;
		component?: string | (() => Promise<any>);
		redirect?: string;
		meta: MetaProps;
		children?: MenuOptions[];
	}
	interface MetaProps {
		icon: string;
		title: string;
		activeMenu?: string;
		isLink?: string;
		isHide: boolean;
		isFull: boolean;
		isAffix: boolean;
		isKeepAlive: boolean;
		account?: string;
	}
}

// * FileType
declare namespace File {
	type ImageMimeType =
		| "image/apng"
		| "image/bmp"
		| "image/gif"
		| "image/jpeg"
		| "image/pjpeg"
		| "image/png"
		| "image/svg+xml"
		| "image/tiff"
		| "image/webp"
		| "image/x-icon";

	type ExcelMimeType = "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
}

// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_URL: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}

import { addDateRange, handleTree, parseTime, resetForm } from "@/utils/ruoyi";
import cache from "@/plugins/cache";
import modal from "@/plugins/modal";

export {};
declare module "vue" {
	interface ComponentCustomProperties {
		parseTime: typeof parseTime;
		resetForm: typeof resetForm;
		handleTree: typeof handleTree;
		addDateRange: typeof addDateRange;
		// 缓存对象
		$cache: typeof cache;
		// 模态框对象
		$modal: typeof modal;
	}
}
