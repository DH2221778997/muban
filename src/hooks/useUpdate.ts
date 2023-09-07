import  { useReducer } from 'react'

const useUpdate = () => {
  const [, update] = useReducer(() => ({}),0)

  return update
}

export default useUpdate