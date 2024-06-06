
import { Error } from '@/tt_core/index'
import { demo_data } from './demo_data'

function delay(secs: number) {
    return new Promise<void>((resolve, _) => {
        setTimeout(() => {
            resolve()
        }, 1000 * secs);
    })
}
function randomReject(reject: any, resolve: any) {
    if (Math.ceil(Math.random() * 10) % 5 == 1) {
        reject(new Error('系统异常'))
    } else {
        resolve()
    }
}

export function post(path: string, data: any) {
    return new Promise((resolve, reject) => {
        delay(1).then(() => {
            randomReject(reject, () => {
                const data = demo_data[path]
                resolve(data)
            })
        })
    })
}