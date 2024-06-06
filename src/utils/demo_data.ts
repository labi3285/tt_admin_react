export const demo_data: Record<string, any> = {
    '/login': {
        token: 'xxx',
        user: {
            account: 'demo',
            pic: '/demo/pic0.jpg'
        }
    },
    '/user_page':
    {
        items: [
            {
                id: 1,
                name: '小明',
                pic: '/demo/pic0.jpg',
                gender: 0,
                labels: ['宅男', '游戏'],
                remark: '一段长文本',
            },
            {
                id: 2,
                name: '小花',
                gender: 1,
                labels: ['读书', '旅游'],
                remark: '一段长文本',
            },
        ],
        total: 99
    }
    ,
    '/upload_pic': {
        url: '/demo/pic0.jpg'
    }
}