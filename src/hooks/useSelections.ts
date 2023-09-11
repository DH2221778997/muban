import React, { useCallback, useState } from 'react'

const useSelections = (n:number) => {
  const [selections,setSelections] = useState(new Array(n).fill(false))
  const checkAll = useCallback(() => setSelections(new Array(n).fill(true)),[n])
  const unCheckAll = useCallback(() => setSelections(new Array(n).fill(false)),[n])
  
}

export default useSelections