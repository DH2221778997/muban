import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'

const { Item } = Form
const FormDemo1 = () => {
  return (
    <Form initialValues={{remember:true}} labelCol={{span:8}}>
      <Item name='name' label='Username' rules={[{required:true,message:'请输入姓名'}]}><Input /></Item>
      <Item name='password' label='Password' rules={[{required:true,message:'请输入密码'}]}><Input.Password /></Item>
      <Item name='remember' valuePropName='checked' wrapperCol={{offset:8}}><Checkbox>Remember me</Checkbox></Item>
      <Item wrapperCol={{offset:8}}><Button type='primary' htmlType='submit'>Submit</Button></Item>
    </Form>
  )
}

export default FormDemo1