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

  const manageError = useCallback((val1, val2, isRequiredErrorProp) => {
    if (val1 != 0 && val1 !== '' && val2 != 0 && val2 !== '') {
      setError(false);
    } else if (isRequiredErrorProp) {
      setError(true);
    }
  }, []);

  useEffect(
    () => manageError(value1, value2, isRequiredError),

    [isRequiredError, value1, value2, manageError]
  );

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
