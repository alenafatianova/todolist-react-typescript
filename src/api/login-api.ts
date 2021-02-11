import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '83326716-3a9b-494e-bd9e-0c165565e0c2'
    }
})
export type loginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type responseType<D = {}> = {
    resultCode: number
    messages: []
    data: D
}
type meResponseType = {
    id: number
    email: string
    login: string
    
}
export const loginAPI = {
    login(data: loginParamsType) {
        return instance.post<responseType<{userId: number}>>(`auth/login`, data)
       
    },
    logout() {
        return  instance.delete('auth/login')
    },
    me() {
        return instance.get<responseType<meResponseType>>('auth/me')
    },
    
}