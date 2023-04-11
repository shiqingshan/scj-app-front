import { defineStore } from "pinia"

export const useAuthStore = defineStore('auth', {
    state: () => ({
        showMenuList: false
    }),
    getters: {
        showMenuListGet(state){

        }
    },
    actions: {
        
    }
})