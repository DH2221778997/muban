import React, { useState } from 'react'
import useDebounceFn from './useDebounceFn'
import useLatest from './useLatest'
const useDebounce = (val, ms) => {
  const [s,setS] = useState(val)
  useDebounceFn(() => setS(val),ms)
  return s
}

export default useDebounce