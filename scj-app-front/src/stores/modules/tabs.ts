import { defineStore } from "pinia";
import piniaPersistConfig from "@/config/piniaPersist";

// TabsStore
export const TabsStore = defineStore({
	id: "TabsState",
	state: () => ({
		tabsMenuList: []
	}),
	actions: {
		
	},
	persist: piniaPersistConfig("TabsState")
});
