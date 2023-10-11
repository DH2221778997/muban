import 'normalize.css';
import './App.css';
import Test from './Test';
import { useRef, useState } from 'react';
import { Button } from 'antd';
import Login from './login/Login';
import UseUpdateDemo from './components/useUpdateDemo';
import UseCounterDemo from './components/UseCounterDemo';
import UseHoverDemo from './components/UseHoverDemo';
import UseDebounceFnDemo from './components/UseDebounceFnDemo';
import UseDebounceDemo from './components/useDebounceDemo';
import UsePreviousDemo from './components/UsePreviousDemo';
import UseLocalStorageDemo from './components/UseLocalStorageDemo';
import ControlledDemo from './components/ControlledDemo';
import UseMemoizedFnDemo from './components/UseMemoizedFnDemo';
import UseIntervalDemo from './components/UseIntervalDemo';
import useWindowResize from './components/UseWindowResizeDemo';
function App() {
  const [val, setVal] = useState(true);
  const ref = useRef(null)
  const size = useWindowResize(ref)
  return (
    <>
      <div ref={ref} style={{border:'1px solid black',height:'50%',width:'50%'}}></div>
      <Button onClick={() => setVal(!val)}>toggle</Button>
      width: 
    </>
  );
}

export default App;
