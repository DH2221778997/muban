import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const UseLocalStorageDemo = () => {
  const [value, setValue] = useLocalStorage('my-key', 'key');

  return (
    <div>
      <div>Value: {value}</div>
      <>{console.log('render start')}</>
      <button onClick={() => setValue('bar')}>bar</button>
      <button onClick={() => setValue('baz')}>baz</button>
      {/* delete data from storage */}
      <button onClick={() => setValue(null)}>Remove</button>
    </div>
  );
};
export default UseLocalStorageDemo;
