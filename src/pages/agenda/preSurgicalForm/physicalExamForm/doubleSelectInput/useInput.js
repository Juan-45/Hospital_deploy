import { useState, useEffect, useCallback } from 'react';

const useInput = (initialState, isRequiredError) => {
  const [error, setError] = useState(false);
  const [value1, value2] = initialState;

 const manageError = useCallback((isRequiredErrorProp) => {
    if (isRequiredErrorProp) {
      setError(true);
    } else {
      setError(false);
    }
  }, []);

  useEffect(() => manageError(isRequiredError), [isRequiredError, manageError]);

  return [value1, value2, error];
};

export default useInput;
