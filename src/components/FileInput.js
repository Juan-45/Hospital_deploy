import clsx from 'clsx';
import React from 'react';

import Input from './Input';
import useInput from './fileInput/useInput';
import useStyles from './fileInput/useStyles';

const FileInput = ({ className, maxSize, nestedHandler, ...props }, ref) => {
  const classes = useStyles();
  const [inputState, handleOnChange] = useInput(maxSize, ref, nestedHandler);
  const { fileObjState, helperText, errorState } = inputState;
  return (
    <Input
      className={clsx(classes.root, className)}
      type="file"
      inputProps={{
        accept: 'image/png, image/jpeg, image/jpg',
        multiple: true,
      }}
      onChange={handleOnChange}
      error={errorState}
      files={fileObjState}
      helperText={helperText}
      //ref={ref}
      {...props}
    />
  );
};

export default React.forwardRef(FileInput);
