import { MouseEvent } from 'react'

export default (props: {
    isMobile: boolean
    isCollapsed: boolean
    onClick(e: MouseEvent<HTMLElement>): void
}) => {
    return (
        <div className={'tt-layout__collapser ' + (( props.isMobile || props.isCollapsed) ? 'tt-layout__collapser-collapse-1' : 'tt-layout__collapser-collapse-0') } onClick={props.onClick }>
            {props.isMobile ? '' : <svg className={props.isCollapsed ? 'tt-layout__collapser__icon' : 'tt-layout__collapser__icon-overturn' } fill='#ffffff' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5035" width="200" height="200"><path d="M272.9 512l265.4-339.1c4.1-5.2 0.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512z m304 0l265.4-339.1c4.1-5.2 0.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" p-id="5036"></path></svg>}
        </div>
    )
}
