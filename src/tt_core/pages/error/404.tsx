import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

import NavigationBar, { getTabIndex } from '../../layout/navigation-bar'


export default () => {
    const navigate = useNavigate()
    const onBackHome = () => {
        navigate('/', { replace: true })
    }
    return (
        <Result
            // status="404"
            title="404"
            subTitle="页面不存在"
            extra={<Button type="primary" onClick={onBackHome} >返回首页</Button>}
        />
    )
}