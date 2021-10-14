import { useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';

const useInput = (initialState, inputNames, nestedHandler, isRequiredError) => {
  const [error, setError] = useState(false);
  const [value1, value2] = initialState;

  const handleOnChangeOne = useDebouncedCallback(nestedHandler(inputNames[0]), 250, {
    trailing: true,
  });
  const handleOnChangeTwo = useDebouncedCallback(nestedHandler(inputNames[1]), 250, {
    trailing: true,
  });

 const manageError = useCallback((isRequiredErrorProp) => {
    if (isRequiredErrorProp) {
      setError(true);
    } else {
      setError(false);
    }
  }, []);

  useEffect(() => manageError(isRequiredError), [isRequiredError, manageError]);

  return [
    {
      value1,
      value2,
      error,
    },

    {
      handleOnChangeOne,
      handleOnChangeTwo,
    },
  ];
};

export default useInput;
