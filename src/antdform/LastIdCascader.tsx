import { Cascader } from 'antd';
import {useAsync} from 'react-use'
import React from 'react'

// ts写的太垃圾了。代码风格好差
const options1 = [
  {value:'zhejiang',label:'浙江',children:[{value:'hangzhou',label:'杭州',children:[{value:'westlake',label:'西湖'}]}]},
  {value:'jiangsu',label:'江苏',children:[{value:'nanjing',label:'南京',children:[{value:'zhonghuamen',label:'中华门'}]}]}
]
const service = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(options1)
    }, 2000);
  })
}
interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

interface LastIdCascaderProps {
  service: () => Promise<false | Option[]>
  value?: string | number;
  onChange?: (val: string | number) => void
}

const LastIdCascader:FC<LastIdCascaderProps> = ({value,onChange}) => {
  const {value: options = [] } = useAsync(service)
  const findPathByValue = (op,target) => {
    let path = []
    op.forEach((item) => {
      if (Array.isArray(item.children)) {
        const res = findPathByValue(item.children,target)
        if (res.length > 0) {
          path = [item.value, ...res]
        }
      }
      if (item.value === target) {
        path.push(item.value)
      }
    })
    return path
  }
  const cascadeValue = findPathByValue(options, value)
  const handleChange = (val) => {
    onChange?.(val[val.length - 1])
  }
  return (
    <Cascader
      options={options}
      value={cascadeValue}
      onChange={handleChange}
      changeOnSelect
     />
  )
}

export default LastIdCascader