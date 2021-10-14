import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import useStyles from './rightFormContainer/useStyles';

const LeftFormContainer = ({ children, className, ...props }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} className={clsx(classes.root, className)} {...props}>
      {children}
    </Grid>
  );
};

export default LeftFormContainer;
