import axios from "axios"
import { Error } from '@/tt_core/index'

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    // timeout: 1000,
})

import store from '@/store/index'
import userSlice from '@/tt_core/store/user'


export function post(path: string, data: any = {}) {
    const state = store.getState()
    return new Promise<any>((resolve, reject) => {
        instance.post(path, data, {
            headers: {
                'tt-token': state.systemUser.tokenInfo?.accessToken
            }
        }).then(res => {
            if (res.data.code == 0) {
                resolve(res.data.data)
            } else {
                reject(new Error(res.data.message, res.data.code, res.data.trace))
                if (res.data.code == 1000) {
                    store.dispatch(userSlice.actions.setLogout())
                    window.location.href = '/login'
                }
            }
        }).catch(err => {
            reject(new Error('系统异常', -1, err))
        }) 
    })
}