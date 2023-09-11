import React, { useState } from "react";
import useFirstMountState from "../hooks/useFirstMountState";

const UseFirstMountStateDemo = () => {
  console.log("Demo start");
  const isFirstMount = useFirstMountState();
  const [render, reRender] = useState(0);
  console.log("Demo useFirstCallled");
  return (
    <div>
      <>{console.log("Demo rendered")}</>
      <span>This component is just mounted: {isFirstMount ? "YES" : "NO"}</span>
      <br />
      <button onClick={() => reRender((render) => render + 1)}>{render}</button>
    </div>
  );
};

export default UseFirstMountStateDemo;
