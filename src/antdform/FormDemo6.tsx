import { Button, Form, Input, Select } from 'antd'
import React, { useState } from 'react'

const { Item } = Form
const { Option } = Select

type Currency = 'rmb' | 'dollar'
interface PriceValue {
  number?: number;
  currency?: Currency
}

interface PriceInputProps {
  value?: PriceValue;
  onChange?: (value: PriceValue) => void
}

const PriceInput: React.FC<PriceInputProps> = ({ value ={}, onChange}) => {
  const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({...value, number:Number(e.target.value)})
  }
  const onSelectChange = (val: Currency) => {
    onChange?.({...value, currency: val})
  }

  return (
    <span>
      <Input style={{width:100}}  value={value.number} onChange={onInputChange}/>
      <Select style={{width:80,margin:'0 8px'}} value={value.currency} onChange={onSelectChange}>
        <Option value='rmb'>RMB</Option>
        <Option value='dollar'>Dollar</Option>
      </Select>
    </span>
  )
}

const FormDemo6 = () => {
  return (
    <Form
      layout='inline'
      onFinish={(values) => console.log(values)}
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        }
      }}
    >
      <Item name='price' label='Price'>
        <PriceInput />
      </Item>
      <Item>
        <Button type='primary' htmlType='submit'>submit</Button>
      </Item>
    </Form>
  )
}

export default FormDemo6