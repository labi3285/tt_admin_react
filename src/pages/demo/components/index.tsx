import { Button } from 'antd'
import { Column } from '@/tt_core/components/Table/index'

export interface DemoItem {
    title: string
    desc?: string
    action?: () => void
}
export function DEMO(title: string, desc?: string, action?: () => void) {
    return {
        title,
        desc,
        action
    }
}
export const demoColumns: Column<DemoItem>[] = [
    { title: '标题', valueKey: 'title', width: 50 },
    { title: '描述', valueKey: 'desc', width: 200 },
    { title: '演示', width: 100, render: (_: any, row: DemoItem, __: number) => <Button onClick={() => {
        row.action && row.action()
    }}>点击查看</Button> },
]