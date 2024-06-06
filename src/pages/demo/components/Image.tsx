import { ReactNode } from 'react'

import { Table, Column } from '@/tt_core/components/Table/index'
import Image from '@/tt_core/components/Image/Image'
import Images from '@/tt_core/components/Image/Images'

interface Item {
  desc: string
  render: () => ReactNode
}

export default () => {
  const pic = '/demo/pic0.jpg'
  const pics = [
    '/demo/pic0.jpg',
    '/demo/pic2.jpg',
    '/demo/pic3.jpg',
    '/demo/pic4.jpg',
    '/demo/pic5.jpg',
    '/demo/pic6.jpg',
    '/demo/pic7.jpg',
    '/demo/pic8.jpg',
    '/demo/pic9.jpg',
  ]
  const columns: Column<Item>[] = [
    {
      title: '控件', width: 200, render: (item: Item) => {
        return item.render()
      }
    },
    { title: '描述', valueKey: 'desc', width: 200 },
  ]

  const rows: Item[] = [
    { desc: '单图', render: () => <Image value={pic} width={100} /> },
    { desc: '多图 showType=1', render: () => <Images value={pics} showType='1' itemWidth={40} /> },
    { desc: '多图 showType=2', render: () => <Images value={pics} showType='2' itemWidth={40} /> },
    { desc: '多图 showType=3', render: () => <Images value={pics} showType='3' itemWidth={40} /> },
    { desc: '多图 showType=4', render: () => <Images value={pics} showType='4' itemWidth={40} /> },
    { desc: '多图 showType=5', render: () => <Images value={pics} showType='5' itemWidth={40} /> },

    
    { desc: '多图 showType=2x2', render: () => <Images value={pics} showType='2x2' itemWidth={40} /> },
    { desc: '多图 showType=3x2', render: () => <Images value={pics} showType='3x2' itemWidth={40} /> },
    { desc: '多图 showType=3x3', render: () => <Images value={pics} showType='3x3' itemWidth={40} /> },


    { desc: '多图 showType=3x3', render: () => <Images value={pics} showType='3x3' itemWidth={40} /> },

    { desc: '多图 showType=undefined', render: () => <Images value={pics} itemWidth={40} /> },


  ]

  return (
    <>
      <Table<Item> columns={columns} rows={rows} />
    </>
  )
}