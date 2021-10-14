import { useState, useEffect, useCallback } from 'react';

const useInput = (value, isRequiredError, shouldReset, nestedHandler) => {
  const [valueState, setValueState] = useState(value ? value : '');
  const [errorState, setErrorState] = useState();
  const [helperText, setHelperText] = useState();

  const removeError = () => setErrorState(false);

  const handleOnChange = (event) => {
    setValueState(event.target.value);
    nestedHandler(event.target.value);
    removeError();
  };

  const setRequiredErrorOn = useCallback((isRequiredErrorProp, inputValue) => {
    if (isRequiredErrorProp && inputValue === '') {
      setErrorState(true);
      setHelperText('Campo Requerido.');
    } else removeError();
  }, []);

  const resetStateValueOn = useCallback((shouldResetProp) => {
    if (shouldResetProp) {
      setValueState('');
    }
  }, []);

  useEffect(() => setRequiredErrorOn(isRequiredError, valueState), [
    isRequiredError,
    valueState,
    setRequiredErrorOn,
  ]);
  useEffect(() => setValueState(value ? value : ''), [value]);
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
