import "normalize.css";
import "./App.css";
import Test from "./Test";
import { useState } from "react";
import { Button } from "antd";
import Login from "./login/Login";
import UseUpdateDemo from "./components/useUpdateDemo";
import UseCounterDemo from "./components/UseCounterDemo";
import UseHoverDemo from "./components/UseHoverDemo";
import UseDebounceFnDemo from "./components/UseDebounceFnDemo";
import UseDebounceDemo from "./components/useDebounceDemo";
import UsePreviousDemo from "./components/UsePreviousDemo";
import UseLocalStorageDemo from "./components/UseLocalStorageDemo";
import UseFirstMountStateDemo from "./components/UseFirstMountStateDemo";
function App() {
  const [val, setVal] = useState(true);
  return (
    <>
      <Button onClick={() => setVal(!val)}>toggle</Button>
      <UseFirstMountStateDemo />
    </>
  );
}

export default App;
