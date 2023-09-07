import React from 'react'
import useCounter from '../hooks/useCounter'
import { Button } from 'antd'

const UseCounterDemo = () => {
  const {count, increase, decrease,extra,setExtra} = useCounter(0)
  return (
    <>
    <>{extra}</>
      <Button onClick={() => setExtra(extra => extra + 5)}>extra</Button>
      <Button onClick={() => increase(5)}>+</Button>
      {count}
      <Button onClick={() => decrease(3)}>-</Button>
    </>
  )
}

export default UseCounterDemo