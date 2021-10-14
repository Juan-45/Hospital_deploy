import React from 'react';

import Input from './Input';
import useInput from './inputText/useInput';

const InputText = (
  { maxLength, isRequiredError, value, nestedHandler, pattern, shouldReset, ...props },
  ref
) => {
  const [inputState, handleOnChange] = useInput(
    value,
    ref,
    isRequiredError,
    shouldReset,
    maxLength,
    pattern,
    nestedHandler
  );

  const { helperText, errorState, valueState } = inputState;

  return (
    <Input
      type="text"
      error={errorState}
      helperText={helperText}
      value={valueState}
      onChange={handleOnChange}
      {...props}
    />
  );
};

export default React.forwardRef(InputText);
