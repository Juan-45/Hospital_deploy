import { useState, useEffect, useCallback } from 'react';

const useInput = (value, isRequiredError, shouldReset, nestedHandler) => {
  const [valueState, setValueState] = useState(value ? value : null);
  const [errorState, setErrorState] = useState(false);
  const [helperText, setHelperText] = useState();

  const removeErrorState = useCallback(() => {
    setHelperText('');
    setErrorState(false);
  }, []);

  const handleOnChange = (val) => {
    setValueState(val);
    nestedHandler(val);
    removeErrorState();
  };

  const setRequiredErrorOn = useCallback(
    (isRequiredErrorProp, inputValue) => {
      const isValueEmpty = inputValue === null;
      if (isRequiredErrorProp && isValueEmpty) {
        setErrorState(true);
        setHelperText('Campo Requerido.');
      } else removeErrorState();
    },
    [removeErrorState]
  );

  const updateStateValueOn = useCallback(
    (valueProp) => setValueState(valueProp ? valueProp : null),
    []
  );

  const resetStateValueOn = useCallback((shouldResetProp) => {
    if (shouldResetProp) {
      setValueState(null);
    }
  }, []);

  useEffect(() => setRequiredErrorOn(isRequiredError, valueState), [
    isRequiredError,
    valueState,
    setRequiredErrorOn,
  ]);
  useEffect(() => updateStateValueOn(value), [value, updateStateValueOn]);
  useEffect(() => resetStateValueOn(shouldReset), [shouldReset, resetStateValueOn]);
  return [
    {
      helperText,
      errorState,
      valueState,
    },
    handleOnChange,
  ];
};

export default useInput;
