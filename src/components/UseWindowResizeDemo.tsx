import { MutableRefObject, useEffect, useState } from 'react'

const useWindowResize = (ref:MutableRefObject<Element>) => {
  const [size,setSize]= useState({width:ref.current.innerWidth,height:ref.current.innerHeight})

  useEffect(() => {
    const node = ref.current
    const onResize = (e) => {
      console.log(e.target)
      setSize({width:e.target.innerWidth,height:e.target.innerHeight})
    }
    node.addEventListener('resize', onResize)
    return () => node.removeEventListener('resize',onResize)
  },[])

  return size
}

export default useWindowResize