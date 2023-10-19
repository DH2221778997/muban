import { Button, Form, InputNumber } from 'antd'
import React from 'react'
import CheckboxButton from '../da/check-btn'
import LastIdCascader from './LastIdCascader'

const { Item } = Form
const FormDemo10 = () => {
  return (
    <Form
      onFinish={(values) => console.log(values)}
      initialValues={{checkbox:[1]}}
    >
      <Item name='number' label='Number'>
        <InputNumber />
      </Item>
      <Item name='checkbox' label='checkbox-example'>
        <CheckboxButton options={[{value:1,label:'aaa'},{value:2,label:'bbb'},{value:3,label:'ccc'},{value:4,label:'ddd'},{value:5,label:'eee'}]} />
      </Item>
      <Item name='classy' label='工单分类'>
        <LastIdCascader />
      </Item>
      <Item>
        <Button type='primary' htmlType='submit'>submit</Button>
      </Item>
     </Form>
  )
}

export default FormDemo10