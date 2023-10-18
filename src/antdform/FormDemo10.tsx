import { Form, InputNumber } from 'antd'
import React from 'react'

const { Item } = Form
const FormDemo10 = () => {
  return (
    <Form>
      <Item name='number' label='Number'>
        <InputNumber />
      </Item>
    </Form>
  )
}

export default FormDemo10