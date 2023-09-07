import  { useCallback, useState } from 'react'

const useCounter = (initialVal:number) => {
  const [count, setCount] = useState<number>(initialVal)
  const increase = useCallback((add:number) => {setCount(count+add);console.log('increase')},[count])
  const decrease = useCallback((minus:number) => {setCount(count - minus);console.log('decrease')},[count])
  console.log('counter')
  return {count,increase,decrease}
}

export default useCounter