import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import clsx from 'clsx';

import useStyles from './standarSwitch/useStyles';

const StandarSwitch = ({ id, className, state, handleOnChange }) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={clsx(classes.root, className)}>
      <Typography>No</Typography>
      <Switch checked={state} onChange={handleOnChange} id={id} />
      <Typography>Sí</Typography>
    </Grid>
  );
};

export default StandarSwitch;
