import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import useStyles from './userLogo/useStyles';

const UserLogo = ({ className, user }) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center" className={clsx(classes.userLogoBox, className)}>
      <Typography variant="button">{user}</Typography>
    </Grid>
  );
};

export default UserLogo;
