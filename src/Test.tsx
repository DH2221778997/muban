import React from "react";
import useMount from "./hooks/useMount";
import useUnMount from "./hooks/useUnMount";

const Test = () => {
  useMount(() => console.log("mount"));
  useUnMount(() => console.log("unmount"));
  return <div>Test</div>;
};

export default Test;
