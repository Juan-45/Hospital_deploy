import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import useStyles from './formAddedItem/useStyles';

const FormAddedItem = ({ children, className }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      className={clsx(classes.root, className)}
    >
      {children}
    </Grid>
  );
};

export default FormAddedItem;
