import React, { useRef } from 'react'
import useHover from '../hooks/useHover'

const UseHoverDemo = () => {
  const ref = useRef(null)
const isHoverd = useHover(ref)
  return (
    <div ref={ref} style={{width:'100px',height:'100px',backgroundColor:`${isHoverd? 'pink':'lightBlue'}`}}>UseHoverDemo</div>
  )
}

export default UseHoverDemo