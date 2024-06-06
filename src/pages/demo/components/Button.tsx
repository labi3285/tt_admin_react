import { ReactNode } from 'react'

import { Table, Column } from '@/tt_core/components/Table/index'
import { Button } from 'antd'

import { EditOutlined } from '@ant-design/icons'

interface Item {
  desc: string
  render: () => ReactNode
}

const DivWrap = (props: {
  bgColor?: string
  children: ReactNode
}) => {
  return (
    <div style={{ backgroundColor: props.bgColor, padding: '5px' }}>{props.children}</div>
  )
}

export default () => {
  const columns: Column<Item>[] = [
    {
      title: '按钮', width: 200, render: (item: Item) => {
        return item.render()
      }
    },
    { title: '描述', valueKey: 'desc', width: 200 },
  ]

  const rows: Item[] = [
    { desc: 'type = undefined', render: () => <Button>按钮</Button> },
    { desc: 'type = primary', render: () => <Button type='primary'>按钮</Button> },
    { desc: 'type = text', render: () => <Button type='text'>按钮</Button> },
    { desc: 'type = dashed', render: () => <Button type='dashed'>按钮</Button> },
    { desc: 'type = link', render: () => <Button type='link'>按钮</Button> },

    { desc: 'danger = true', render: () => <Button danger >按钮</Button> },
    { desc: 'danger = true', render: () => <Button danger type='primary'>按钮</Button> },
    { desc: 'danger = true', render: () => <Button danger type='text'>按钮</Button> },
    { desc: 'danger = true', render: () => <Button danger type='dashed'>按钮</Button> },
    { desc: 'danger = true', render: () => <Button danger type='link'>按钮</Button> },

    { desc: 'icon', render: () => <Button icon={<EditOutlined />} >按钮</Button> },
    { desc: 'icon', render: () => <Button icon={<EditOutlined />} type='primary'>按钮</Button> },
    { desc: 'icon', render: () => <Button icon={<EditOutlined />} type='text'>按钮</Button> },
    { desc: 'icon', render: () => <Button icon={<EditOutlined />} type='dashed'>按钮</Button> },
    { desc: 'icon', render: () => <Button icon={<EditOutlined />} type='link'>按钮</Button> },

    { desc: 'shape = circle', render: () => <Button shape='circle' icon={<EditOutlined />} ></Button> },
    { desc: 'shape = circle', render: () => <Button shape='circle' icon={<EditOutlined />} type='primary'></Button> },
    { desc: 'shape = circle', render: () => <Button shape='circle' icon={<EditOutlined />} type='text'></Button> },
    { desc: 'shape = circle', render: () => <Button shape='circle' icon={<EditOutlined />} type='dashed'></Button> },
    { desc: 'shape = circle', render: () => <Button shape='circle' icon={<EditOutlined />} type='link'></Button> },

    { desc: 'disabled = true', render: () => <Button disabled >按钮</Button> },
    { desc: 'disabled = true', render: () => <Button disabled type='primary'>按钮</Button> },
    { desc: 'disabled = true', render: () => <Button disabled type='text'>按钮</Button> },
    { desc: 'disabled = true', render: () => <Button disabled type='dashed'>按钮</Button> },
    { desc: 'disabled = true', render: () => <Button disabled type='link'>按钮</Button> },

    { desc: 'loading = true', render: () => <Button loading >按钮</Button> },
    { desc: 'loading = true', render: () => <Button loading type='primary'>按钮</Button> },
    { desc: 'loading = true', render: () => <Button loading type='text'>按钮</Button> },
    { desc: 'loading = true', render: () => <Button loading type='dashed'>按钮</Button> },
    { desc: 'loading = true', render: () => <Button loading type='link'>按钮</Button> },

    { desc: 'ghost = true', render: () => <DivWrap bgColor='gray' ><Button ghost >按钮</Button></DivWrap> },
    { desc: 'ghost = true', render: () => <DivWrap bgColor='gray' ><Button ghost type='primary'>按钮</Button></DivWrap> },
    { desc: 'ghost = true', render: () => <DivWrap bgColor='gray' ><Button ghost type='text'>按钮</Button></DivWrap> },
    { desc: 'ghost = true', render: () => <DivWrap bgColor='gray' ><Button ghost type='dashed'>按钮</Button></DivWrap> },
    { desc: 'ghost = true', render: () => <DivWrap bgColor='gray' ><Button ghost type='link'>按钮</Button></DivWrap> },

    { desc: 'block = true', render: () => <DivWrap bgColor='gray' ><Button block >按钮</Button></DivWrap> },
    { desc: 'block = true', render: () => <DivWrap bgColor='gray' ><Button block type='primary'>按钮</Button></DivWrap> },
    { desc: 'block = true', render: () => <DivWrap bgColor='gray' ><Button block type='text'>按钮</Button></DivWrap> },
    { desc: 'block = true', render: () => <DivWrap bgColor='gray' ><Button block type='dashed'>按钮</Button></DivWrap> },
    { desc: 'block = true', render: () => <DivWrap bgColor='gray' ><Button block type='link'>按钮</Button></DivWrap> },

  ]

  return (
    <>
      <Table<Item> columns={columns} rows={rows} />
    </>
  )
}