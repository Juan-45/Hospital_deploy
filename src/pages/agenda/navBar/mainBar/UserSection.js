import Grid from '@material-ui/core/Grid';
import UserLogo from 'components/UserLogo';

import UserOptions from './userSection/UserOptions';
import useStyles from './userSection/useStyles';

const UserSection = () => {
  const classes = useStyles();
  return (
    <Grid container item wrap="nowrap" justifyContent="flex-end" xs={4}>
      <UserLogo user="JC" className={classes.userLogo} />
      <UserOptions badgePosition={2} badgeValue={10} />
    </Grid>
  );
};

export default UserSection;
