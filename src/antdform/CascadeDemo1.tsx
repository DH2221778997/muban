import { Cascader } from 'antd';
import React from 'react'

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {value:'zhejiang',label:'浙江',children:[{value:'hangzhou',label:'杭州',children:[{value:'westlake',label:'西湖'}]}]},
  {value:'jiangsu',label:'江苏',children:[{value:'nanjing',label:'南京',children:[{value:'zhonghuamen',label:'中华门'}]}]}
]

const CascadeDemo1 = () => {

  const onChange = (val:(string|number)[]) => {
    console.log(val)
  }
  return (
    <Cascader options={options} onChange={onChange} changeOnSelect/>
  )
}

export default CascadeDemo1