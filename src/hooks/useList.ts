import React, { useCallback, useState } from 'react'

const useList = <T>(initial:T[]) => {
  const [list,setList] = useState(initial)
  const remove = useCallback((index) => {
    setList(prev => prev.filter((it,idx) => index !== idx))
  },[])
}

export default useList