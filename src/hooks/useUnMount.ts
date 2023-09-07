import { useEffect } from "react";

const useUnMount = (fn: () => void) => {
  useEffect(() => {
    return () => {
      fn();
    };
  }, []);
};

export default useUnMount;
