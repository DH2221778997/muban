import "normalize.css";
import "./App.css";
import Test from "./Test";
import { useState } from "react";
import { Button } from "antd";
import Login from "./login/Login";
function App() {
  const [val, setVal] = useState(true);

  return (
    <>
      <Button onClick={() => setVal(!val)}>toggle</Button>
      {val ? <Login /> : <Test />}
    </>
  );
}

export default App;
