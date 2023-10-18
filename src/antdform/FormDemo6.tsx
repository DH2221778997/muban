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
  const [number,setNumber] = useState(-1000)
  const [currency,setCurrency] = useState<Currency>('dollar')

  const onValuesChange = (changedValue) => {
    onChange?.({number,currency,...changedValue})
  }

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = Number(e.target.value)
    setNumber(newNumber)
    onValuesChange({number:newNumber})
  }

  const onCurrencyChange = (val) => {
    setCurrency(val)
    onValuesChange({currency:val})
  }

  return (
    <span>
      <Input style={{width:100}} value={number} onChange={onNumberChange} />
      <Select style={{width:80,margin:'0 8px'}} value={currency} onChange={onCurrencyChange}>
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