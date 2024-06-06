import { useState } from 'react'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { App, Form, Button, Input, Checkbox } from 'antd'

import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from '../../../store/index'
import settingsSlice from '../../store/settings'
import userSlice from '../../store/user'

import { post } from '@/utils/request'

export default () => {
  const { message } = App.useApp()

  const systemSettings = useSelector((state) => state.systemSettings)
  const dispatch = useDispatch()

  const navigate = useNavigate()


  const [loading, setLoading ] = useState<boolean>(false)
  const onSubmit = async (params: any) => {
    setLoading(true)
    try {
      const resp: any = await post('/user/login_by_account', params)
      dispatch(settingsSlice.actions.setIsAccountRemember(params.isAccountRemember))
      dispatch(settingsSlice.actions.setRememberedAccount(params.account))
      dispatch(userSlice.actions.setLogin({
        tokenInfo: {
          accessToken: resp.token
        },
        userInfo: {
          account: resp.user.account
        }
      }))
      navigate('/', { replace: true })
    } catch (err : any) {
      if (!err.code || err.code > 0) {
        message.error(err.message || '系统异常')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='tt-login-form'>

      <div className='title-wrap'>
        <img src='./vite.svg' className='logo' />
        <div className='title'>后台管理系统</div>
      </div>


      <Form
        name="loginForm"
        style={{ width: '100%' }}
        initialValues={{ account: systemSettings.rememberedAccount, password: undefined, isAccountRemember: systemSettings.isAccountRemember }}
        onFinish={onSubmit}
        disabled={loading}
        autoComplete="off"
        size='large'
      >
        <Form.Item name="account" rules={[{ required: true, message: '请输入用户名' }]}>
          <Input prefix={<UserOutlined />} placeholder='账户名' />
        </Form.Item>

        <Form.Item name="password" style={{ margin: '10px 0' }} rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password disabled={loading} prefix={<LockOutlined />} placeholder='密码' />
        </Form.Item>

        <Form.Item name="isAccountRemember" valuePropName="checked" noStyle>
          <Checkbox style={{ paddingBottom: '10px' }}>记住账号</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button disabled={false} loading={loading} style={{ width: '100%' }} type="primary" htmlType="submit">登录</Button>
        </Form.Item>

      </Form>

    </div>
  )
}