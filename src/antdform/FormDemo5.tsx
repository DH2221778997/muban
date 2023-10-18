import { Form, Input, Select, Space, Tooltip } from 'antd'
import React from 'react'

const { Item } = Form
const { Option } = Select
const FormDemo5 = () => {
  return (
    <Form>
      <Item label='Username'>
        <Space>
          <Item noStyle name='username'>
            <Input placeholder='please input'/>
          </Item>
        <Tooltip title='Useful information'>
          <a>Need Help?</a>
        </Tooltip>
        </Space>
      </Item>
      <Item label='Address'>
        <Item noStyle name={['address,province']}>
          <Select>
            <Option>zhejiang</Option>
            <Option>jiangsu</Option>
          </Select>
        </Item>
        <Item noStyle name={['address,street']}>
          <Input placeholder='street' />
        </Item>
      </Item>
      <Item label='BirthDate'>
        
      </Item>
    </Form>
  )
}

export default FormDemo5