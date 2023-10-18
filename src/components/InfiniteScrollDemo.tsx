
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const total = new Array(340).fill(0).map((_,index) => `${index}`)
const getData =async (nextId:string|undefined,limit:number): Promise<{nextId:string|undefined,list:string[]}> => {
  const start = total.findIndex(it => it === nextId)
  const end = start + limit
  const list = total.slice(start,end)
  const nId = total.length >= end ? total[end] : undefined
  return new Promise(resolve => setTimeout(() => {
    resolve({
      list,
      nextId: nId,
    })
  },2000))
}

const InfiniteScrollDemo = () => {
  const [reachBottom,setReachBottom] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [list, setList] = useState<string[]>([])
  const nextIdRef = useRef<string | undefined>('0')

  // 处理loading
  const [firstLoading,setFirstLoading] = useState(false)
  const [loadMore,setLoadMore] = useState(false)
  
  console.log('list',list)
  useEffect(() => {
    //首次加载拿数据 
    setFirstLoading(true)
    getData(nextIdRef.current,30).then(res => {setFirstLoading(false);setList(res.list);nextIdRef.current = res.nextId;})
  },[])
  useEffect(() => {
    const onScroll = () => {
      if (wrapperRef.current) {
        const scrollHeight = wrapperRef.current?.scrollHeight
        const scrollTop = wrapperRef.current?.scrollTop
        const offsetHeight = wrapperRef.current?.offsetHeight

        const hasReachedBottom = scrollHeight - (scrollTop + offsetHeight) <= 80
        console.log('hasReachedBottom',hasReachedBottom)
        setReachBottom(hasReachedBottom)
      }
      
    }
    wrapperRef.current?.addEventListener('scroll', onScroll)
    return () => wrapperRef.current?.removeEventListener('scroll',onScroll)
  },[])

  useEffect(() => {
    if (reachBottom) {
      if (nextIdRef.current) {
        setLoadMore(true)
        getData(nextIdRef.current,30).then(res => {
          setLoadMore(false)
         setList(prev => ([...prev,...res.list]))
         nextIdRef.current = res.nextId
       })
      }
    }
  },[reachBottom])
  return (
    <div style={{width:'50%',height:'400px',overflowY:'auto'}} ref={wrapperRef}>
      {firstLoading 
      ? <div>loading</div>
      : <>
        {list.map(it => (<div key={it} style={{textAlign:'center',height:'24px',border:'1px solid black'}}>row {it}</div>))}
        {loadMore ? <div>loading more....</div> : null}
        {nextIdRef.current? null : <div>no more data</div>}
        </>
      }
    </div>
  )
}

export default InfiniteScrollDemo