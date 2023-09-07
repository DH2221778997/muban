import { useCallback, useEffect, useState } from 'react'

const useHover = (ref) => {
  const [isHoverd, setIsHovered] = useState<boolean>(false)
  const handleHover = useCallback(() => setIsHovered(true),[])
  const handleMove = useCallback(() => setIsHovered(false),[])
  useEffect(() => {
    ref.current.addEventListener('mouseover',handleHover)
    ref.current.addEventListener('mouseout',handleMove)
    return () => {
      ref.current.removeEventListener('mouseover',handleHover)
      ref.current.removeEventListener('mouseout',handleMove)
    }
  },[])
  return isHoverd
}

export default useHover