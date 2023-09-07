import "normalize.css";
import "./App.css";
import Test from "./Test";
import { useState } from "react";
import { Button } from "antd";
import Login from "./login/Login";
import UseUpdateDemo from "./components/useUpdateDemo";
import UseCounterDemo from "./components/UseCounterDemo";
import UseHoverDemo from "./components/UseHoverDemo";
function App() {
  const [val, setVal] = useState(true);
  return (
    <>
      <Button onClick={() => setVal(!val)}>toggle</Button>
      <UseCounterDemo />
    </>
  );
}

export default App;
