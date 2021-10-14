import { useState, useEffect, useCallback } from 'react';

const useInput = (value, nestedHandler) => {
  const [valueState, setValueState] = useState(value ? value : 0);

  const handleOnChange = (event, input) => {
    setValueState(input);
    nestedHandler(input);
  };
  const updateStateValueOn = useCallback(
    (valueProp) => setValueState(valueProp ? valueProp : null),
    []
  );

  useEffect(() => updateStateValueOn(value), [value, updateStateValueOn]);

  return [valueState, handleOnChange];
};

export default useInput;
