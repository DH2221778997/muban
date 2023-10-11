import  { useCallback, useState } from 'react'

const useCounter = (initialVal:number=0,{min,max}:{min:number,max:number}) => {
  const [count, setCount] = useState<number>(initialVal)
  const inc = useCallback((delta?: number ) => {
    delta = delta ?? 1;
    (count + delta) > max ? setCount(count) : setCount(prev => prev + (delta??1))
  },[count,max])
  const dec = useCallback((delta?: number ) => {
    delta = delta ?? 1;
    (count - delta) < min ? setCount(count) : setCount(prev => prev - (delta??1))
  },[count,min])
  const set = useCallback((value:number|((c:number) => number)) => {
    if (typeof value === 'number') {
      if (value > max || value < min) { return }
      setCount(value)
    }
    if (typeof value === 'function') {
      if (value(count) > max || value(count) < min) { return }
      setCount(value)
    }
  },[count,max,min])
  const reset = useCallback(() => {
    setCount(initialVal)
  },[initialVal])

  return [count,{inc,dec,set,reset}] as const
}
export default useCounter