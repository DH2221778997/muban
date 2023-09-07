import React from "react";
import useMount from "./hooks/useMount";
import useUnMount from "./hooks/useUnMount";
import useUnMountedRef from "./hooks/useUnMountedRef";

const Test = () => {
  const ref = useUnMountedRef();
  useMount(() => console.log("mount", ref.current));
  useUnMount(() => console.log("unmount", ref.current));
  return <div>Test</div>;
};

export default Test;
