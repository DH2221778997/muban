import React, { useEffect, useRef } from 'react'

const useInterval = (
    callback: () => void,
    delay?: number | undefined
    ) => {
  const fnRef = useRef<Function>(() => {})
  useEffect(() => {
    fnRef.current = callback
  },[callback])
  useEffect(() => {
    const timerId = setInterval(() => fnRef.current(),delay)
    return () => clearInterval(timerId)
  },[delay])
}

export default useInterval