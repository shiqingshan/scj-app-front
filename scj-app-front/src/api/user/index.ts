import request from '@/utils/request';

// 登录方法
export function login(username: string, password: string, accountType: string) {
    const data = {
        username,
        password,
        accountType,
    };
    return request({
        url: '/app/login',
        headers: {
            isToken: false,
        },
        method: 'post',
        data: data,
    });
}

export function register(data: any) {
    return request({
        url: '/app/register',
        headers: {
            isToken: false,
        },
        method: 'post',
        data: data,
    });
}