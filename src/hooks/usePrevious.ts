import { useEffect, useRef } from 'react'

const usePrevious = (value, defaultValue?) => {
  console.log('useprevious run')
  const ref = useRef(defaultValue);
  useEffect(() => {
    ref.current = value;
    console.log('useprevious effect run','ref.current',ref.current)
  }, [value]);
  console.log('usePrevious',ref.current)
  return ref.current;
};

export default usePrevious