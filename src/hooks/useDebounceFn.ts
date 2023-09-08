import React from 'react'
import { debounce } from 'lodash'
const useDebounceFn = (fn,ms) => {
  
  const run = debounce(fn,ms)

  return { run }
}

export default useDebounceFn