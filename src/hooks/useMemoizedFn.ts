import { useCallback, useRef } from "react"

type Functype = (...args:any[]) => any
const useMemoizedFn = (fn:Functype) => {
  const f = useCallback(fn,[])
  return f
}

export default useMemoizedFn