import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import React from 'react';

import useStyles from './input/useStyles';

const Input = ({ className, ...props }, ref) => {
  const classes = useStyles();

  return (
    <TextField
      variant="outlined"
      color="secondary"
      size="small"
      fullWidth
      hiddenLabel
      className={clsx(classes.root, className)}
      ref={ref}
      {...props}
    />
  );
};

export default React.forwardRef(Input);
