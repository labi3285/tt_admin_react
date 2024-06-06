
import { CSSProperties, ReactNode, ChangeEvent, useEffect } from 'react'
import { Button } from 'antd'

import './index.scss'

export interface Props {
    icon?: ReactNode
    message?: string
    onRetry?: () => void
}
const Component = (props: Props) => {
    return (
        <div className='placeholder__empty'>
            {props.icon ? props.icon : <svg fill='#dddddd' viewBox="0 0 1151 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6109" width="80" height="80"><path d="M600.245 953.8H22.877c-6.08 0-11.902-2.399-16.19-6.654S0 937.099 0.032 931.084c0-12.543 10.399-22.718 22.877-22.718h104.02a89.525 89.525 0 0 1-12.191-45.306V204.326c0-24.093 9.694-47.194 26.908-64.216s40.571-26.556 64.92-26.524h68.728V90.773c0-24.093 9.694-47.194 26.908-64.216S342.773 0 367.122 0.032h550.235c24.35-0.064 47.706 9.47 64.92 26.493s26.909 40.123 26.909 64.216v658.733c0 16.51-4.448 31.964-12.223 45.307h126.865c12.67 0 22.973 10.078 22.973 22.717 0 12.542-10.207 22.717-22.941 22.717H848.63v22.813c0 16.51-4.448 31.964-12.223 45.306h12.287c12.606 0 22.877 10.08 22.877 22.718 0 12.542-10.399 22.717-22.877 22.717H728.037a44.922 44.922 0 0 1-7.04 55.289 46.01 46.01 0 0 1-64.887 0l-55.833-55.29z m83.861-45.402h72.92c25.212 0 45.69-20.221 45.69-45.53V203.303a44.154 44.154 0 0 0-44.25-44.219h-553.66c-24.445 0-44.25 19.806-44.25 44.219v659.565c0 25.149 20.637 45.53 45.658 45.53h348.149l-11.775-11.678a44.986 44.986 0 0 1-11.934-43.899l-21.662-21.469c-67.447 49.722-162.22 39.483-217.284-23.453s-51.738-157.26 7.583-216.261c59.512-59.129 155.084-62.616 218.82-7.967s73.911 148.813 23.293 215.557l21.662 21.47a46.074 46.074 0 0 1 44.346 11.774l76.662 75.894z m164.492-113.521h69.015a45.658 45.658 0 0 0 45.659-45.403V90.964c0-25.148-20.446-45.402-45.659-45.402H366.738a45.626 45.626 0 0 0-45.626 45.403v22.717h435.657c24.35-0.064 47.706 9.47 64.92 26.492s26.909 40.123 26.909 64.216v590.487z m-354.676-10.559c28.989-28.7 40.283-70.487 29.693-109.682s-41.531-69.784-81.11-80.278a115.442 115.442 0 0 0-110.77 29.404c-44.795 44.346-44.795 116.242 0 160.588s117.393 44.346 162.187 0z m-241.634-534.43c0-12.542 10.271-22.684 22.91-22.716h252.32c12.67 0 22.941 10.174 22.941 22.717s-10.27 22.717-22.94 22.717h-252.29c-6.079 0.032-11.934-2.368-16.253-6.623s-6.72-10.047-6.688-16.062z m0 113.555c0-12.543 10.207-22.718 22.782-22.718h367.282a22.717 22.717 0 1 1 0 45.435H275.07c-6.08 0-11.87-2.4-16.158-6.655s-6.656-10.047-6.624-16.03z m0 113.521c0-12.542 10.24-22.717 22.878-22.717h160.62a22.717 22.717 0 1 1 0 45.435h-160.62a22.717 22.717 0 0 1-22.91-22.718z" p-id="6110"></path></svg>}
            {props.message ? <div className='placeholder__empty__message'>{props.message}</div> : ''}
            {/* {props.onRetry ? <Button className='placeholder__empty__retry' size='middle' onClick={props.onRetry}>重试</Button> : ''} */}
        </div>
    )
}

export default Component