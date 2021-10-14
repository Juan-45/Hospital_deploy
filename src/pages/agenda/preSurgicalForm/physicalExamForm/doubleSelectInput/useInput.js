import { useState, useEffect, useCallback } from 'react';

const useInput = (initialState, isRequiredError) => {
  const [error, setError] = useState(false);
  const [value1, value2] = initialState;

  const manageError = useCallback((val1, val2, isRequiredErrorProp) => {
    if (val1 !== '' && val2 !== '') {
      setError(false);
    } else if (isRequiredErrorProp) {
      setError(true);
    }
  }, []);

  useEffect(() => manageError(value1, value2, isRequiredError), [
    isRequiredError,
    value1,
    value2,
    manageError,
  ]);

  return [value1, value2, error];
};

export default useInput;
