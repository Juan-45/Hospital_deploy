import { useEffect, useState, useCallback } from 'react';

const useInput = (nestedHandler, initialState, setGroupState, name) => {
  const [value, setValue] = useState(initialState ? initialState : false);

  const handleOnChange = (event) => {
    setValue(event.target.checked);
    nestedHandler(event);
    setGroupState((prevState) => ({
      ...prevState,
      [name]: event.target.checked,
    }));
  };

  const updateStateValueOn = useCallback((valueProp) => setValue(valueProp), []);

  useEffect(() => updateStateValueOn(initialState), [initialState, updateStateValueOn]);

  return [value, handleOnChange];
};

export default useInput;
