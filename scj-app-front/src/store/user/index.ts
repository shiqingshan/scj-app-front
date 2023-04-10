import { defineStore } from "pinia";
import { getToken,setToken } from "@/utils/auth";
import { login } from "@/api/user";

export const useUserStore = defineStore('user',{
    state: () :{
        token?: string,
        name: string,
        accountType: string,
    }=> ({
        token: getToken(),
        name: '',
        accountType: '1'
    }),
    getters: {},
    actions: {
        //登录
        login(username: string, password: string, accountType: string) {
            return new Promise((resolve, reject) => {
                login(username, password, accountType)
                    .then((res: any) => {
                        setToken(res.token);
                        this.token = res.token;
                        resolve(1);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        },
        //退出登录
        logOut() {
            
        }

    }
})