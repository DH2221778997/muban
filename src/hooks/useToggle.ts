import React, { useState } from 'react';

const useToggle = (
  initialValue: boolean
): [boolean, (nextVal: boolean) => void] => {
  const [val, setVal] = useState<boolean>(initialValue);
  return [val, setVal];
};

export default useToggle;
