import React, { useState } from 'react'
import useDebounce from '../hooks/useDebounce';

const UseDebounceDemo = () => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 500);

  return (
    <div>
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Typed value"
        style={{ width: 280 }}
      />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  );
}

export default UseDebounceDemo