import { useState, useEffect, useCallback } from 'react';

const useInput = (isRequiredError, value, nestedHandler, evaluateValueEffect, shouldReset) => {
  const [valueState, setValueState] = useState(value ? value : '');
  const [errorState, setErrorState] = useState();
  const [helperText, setHelperText] = useState();

  const removeErrorState = useCallback(() => {
    setHelperText('');
    setErrorState(false);
  }, []);

  const handleOnChange = (event) => {
    setValueState(event.target.value);
    nestedHandler(event.target.value);
    removeErrorState();
  };

  const removeWhiteSpacesOnBlur = (event) => {
    setValueState(event.target.value.trim());
  };

  const updateStateValueOn = useCallback((valueProp) => setValueState(valueProp), []);

  const resetStateValueOn = useCallback((shouldResetProp) => {
    if (shouldResetProp) {
      setValueState('');
    }
  }, []);

  const setRequiredErrorOn = useCallback(
    (isRequiredErrorProp, inputValue) => {
      if (isRequiredErrorProp && inputValue === '') {
        setErrorState(true);
        setHelperText('Campo Requerido.');
      } else removeErrorState();
    },
    [removeErrorState]
  );

  useEffect(() => {
    if (evaluateValueEffect) {
      evaluateValueEffect(valueState);
    }
  }, [valueState, evaluateValueEffect]);

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
    removeWhiteSpacesOnBlur,
  ];
};

export default useInput;
