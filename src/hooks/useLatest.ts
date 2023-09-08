import React, { useRef } from 'react'

const useLatest = (val) => {
  const ref = useRef()
  ref.current = val
  return ref
}

export default useLatest