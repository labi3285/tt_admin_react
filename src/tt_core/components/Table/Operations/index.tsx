import { ReactNode, cloneElement, isValidElement } from 'react'
import { Space, Popover, Button, Flex } from 'antd'

import { OperationColumn, Action } from '../Table'
import OperationButton from './Button'
import OperationConfirm from './Confirm'

import { EllipsisOutlined } from '@ant-design/icons'

export default function OperationItems<T>(message: any, operationColumn: OperationColumn<T>, item: T, rowIndex: number) {
    const actionNodes: ReactNode[] = []
    let columnIndex = 0

    function actionNode(action: Action<T>, columnIndex: number) {
        if (action.show && !action.show(item)) {
            return null
        }
        if (action.render) {
            const node = action.render(item)
            if (isValidElement(node)) {
                //@ts-ignore
                return cloneElement(action.render(item), { key: item })
            } else {
                return action.render(item)
            }
        } else {
            const Button = OperationButton(message, action, item, rowIndex)
            let Component = undefined
            if (action.confirm) {
                Component = OperationConfirm(message, action, item, Button, rowIndex, columnIndex)
            } else {
                Component = Button
            }
            return <Component key={columnIndex} />
        }
    }

    for (const action of operationColumn!.actions) {
        const node = actionNode(action, columnIndex)
        if (node) {
            actionNodes.push(actionNode(action, columnIndex))
            columnIndex += 1
        }
    }

    let moreNode: ReactNode = null
    if (operationColumn!.foldActions && operationColumn!.foldActions.length > 0) {
        const foldActionNodes: ReactNode[] = []
        for (const action of operationColumn!.foldActions) {
            const node = actionNode(action, columnIndex)
            if (node) {
                foldActionNodes.push(actionNode(action, columnIndex))
                columnIndex += 1
            }
        }
        if (foldActionNodes.length > 0) {
            moreNode = (
                <Popover key={columnIndex} content={<Flex vertical><Space>{foldActionNodes}</Space></Flex>}>
                    <Button icon={<EllipsisOutlined/>} />
                </Popover>
            )
        }
    } 
    return (
        <Space>{actionNodes}{moreNode ? moreNode : ''}</Space>
    )
}