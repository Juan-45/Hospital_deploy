import React from 'react';

import Input from './Input';
import useInput from './inputNumber/useInput';

const InputNumber = (
  { inputProps, isRequiredError, value, nestedHandler, shouldReset, ...props },
  ref
) => {
  const [inputState, handleOnChange] = useInput(
    inputProps,
    value,
    ref,
    isRequiredError,
    shouldReset,
    nestedHandler
  );
  const { helperText, errorState, valueState } = inputState;

  return (
    <Input
      inputProps={inputProps}
      error={errorState}
      helperText={helperText}
      value={valueState}
      onChange={handleOnChange}
      {...props}
    />
  );
};

export default React.forwardRef(InputNumber);
