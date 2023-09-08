import React, { useState } from 'react'
import usePrevious from '../hooks/usePrevious';

const UsePreviousDemo = () => {
  console.log('demo start')
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <>{console.log('demo render')}</>
      <p>
        Now: {count}, before: {prevCount}
      </p>
    </div>
  );
}

export default UsePreviousDemo