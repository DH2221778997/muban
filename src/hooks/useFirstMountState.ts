import  { useEffect, useRef, useState } from 'react'

const useFirstMountState = () => {
  const is = useRef(true)
  console.log('is',is.current)
  if (is.current) {
    is.current = false
    return true
  }
  console.log('return',is.current)
  return is.current
}

export default useFirstMountState
