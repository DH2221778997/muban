import { Button, Form, Input } from 'antd'
import React from 'react'
import { UserOutlined } from '@ant-design/icons'
const { Item } = Form
const FormDemo7 = () => {
  return (
    <Form layout='inline'>
      <Item name='username' rules={[{required:true,message:'请输入用户名'}]}><Input placeholder='username' prefix={<UserOutlined />} /></Item>
      <Item name='password' rules={[{required:true,message:'请输入密码'}]}><Input.Password  placeholder='password' prefix={<UserOutlined />} /></Item>
      <Item shouldUpdate>
        {
          ({getFieldValue}) => {
            const username = getFieldValue('username')
            const password = getFieldValue('password')
            if (Boolean(username) && Boolean(password)) {
              return <Button type='primary' htmlType='submit'>Login</Button>
            }
            return <Button disabled htmlType='submit'>Login</Button>
          }
        }
      </Item>
    </Form>
  )
}

export default FormDemo7