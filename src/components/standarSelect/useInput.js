import { useState, useEffect, useCallback } from 'react';

const useInput = (value, nestedHandler) => {
  const [valueState, setValueState] = useState(value ? value : '');

  const handleOnChange = (event) => {
    setValueState(event.target.value);
    nestedHandler(event.target.value);
  };

  const updateStateValueOn = useCallback((valueProp) => setValueState(valueProp), []);

  useEffect(() => updateStateValueOn(value), [value, updateStateValueOn]);

  return [valueState, handleOnChange];
};

export default useInput;
