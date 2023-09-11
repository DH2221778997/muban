import { useEffect, useState } from 'react';
import useLatest from './useLatest';

const useLocalStorage = (key: string, defaults: string) => {
  const [val, setVal] = useState(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key)!)
      : defaults
  );
  console.log('localstorage', key, defaults, val, localStorage.getItem(key));
  useEffect(() => {
    console.log('useEffect start', val);
    val === null
      ? localStorage.removeItem(key)
      : localStorage.setItem(key, JSON.stringify(val));
  }, [val, key]);
  return [val, setVal];
};

export default useLocalStorage;
