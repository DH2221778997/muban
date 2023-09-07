import { useEffect, useRef } from "react";

const useUnMountedRef = () => {
  const ref = useRef<boolean>();
  useEffect(() => {
    ref.current = false;
    return () => {
      ref.current = true;
    };
  }, []);
  return ref;
};

export default useUnMountedRef;
