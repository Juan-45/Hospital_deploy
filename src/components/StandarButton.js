import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const StandarButton = ({ text, ...props }, ref) => (
  <Button size="small" {...props} ref={ref}>
    <Typography>{text}</Typography>
  </Button>
);
export default React.forwardRef(StandarButton);
