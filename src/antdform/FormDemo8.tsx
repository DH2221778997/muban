import { Button, Cascader, Col, Form, Input, Row, Select } from 'antd'
import React from 'react'


const { Item } = Form
const { Option } = Select

const FormDemo8 = () => {

  const selectBefore = (
    <Select defaultValue={86}>
      <Option value={86}>+86</Option>
      <Option value={87}>+87</Option>
    </Select>
  )
  const selectAfter = (
    <Select>
      <Option value={86}>$</Option>
      <Option value={87}>¥</Option>
    </Select>
  )
  return (
    <Form
      labelCol={{span:8}}
      wrapperCol={{span:16}}
    >
      <Item name='email' label='E-mail' rules={[{required:true,message:'请输入'}]}>
        <Input />
      </Item>
      <Item name='password' label='Password' rules={[{required:true,message:'请输入'}]}>
        <Input.Password />
      </Item>
      <Item name='confirmPassword' label='ConfirmPassword' rules={[{required:true,message:'请输入'}]}>
        <Input.Password />
      </Item>
      <Item name='nickName' tooltip='hello' label='Nickname' rules={[{required:true,message:'请输入'}]}>
        <Input />
      </Item>
      <Item name='habitualResidence' label='Habitual Residence' rules={[{required:true,message:'请输入'}]}>
        <Cascader />
      </Item>
      <Item name='phoneNumber' label='Phone Number' rules={[{required:true,message:'请输入'}]}>
        <Input addonBefore={selectBefore}/>
      </Item>
      <Item name='donation' label='Donation' rules={[{required:true,message:'请输入'}]}>
        <Input addonAfter={selectAfter}/>
      </Item>
      <Item label='Captcha' extra='We must make sure that your are a human'>
        <Row gutter={8}>
          <Col span={12}>
            <Item name='captcha'  noStyle>
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Button>Get captcha</Button>
          </Col>
        </Row>
      </Item>
      <Item name='' label='' rules={[{required:true,message:'请输入'}]}>

      </Item>
      <Item name='' label='' rules={[{required:true,message:'请输入'}]}>

      </Item>
      <Item name='' label='' rules={[{required:true,message:'请输入'}]}>

      </Item>
      <Item name='' label='' rules={[{required:true,message:'请输入'}]}>

      </Item>
      <Item></Item>
    </Form>
  )
}

export default FormDemo8