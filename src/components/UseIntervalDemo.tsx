import React, { useState } from 'react'
import useInterval from '../hooks/useInterval';

const UseIntervalDemo = () => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    console.log(
      'interval正在执行'
    )
    setCount(count + 1);
  }, 1000);

  return <div>count: {count}</div>;
}

export default UseIntervalDemo