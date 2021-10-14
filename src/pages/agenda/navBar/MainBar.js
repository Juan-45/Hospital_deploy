import Grid from '@material-ui/core/Grid';

import HospitalSection from './mainBar/HospitalSection';
import UserSection from './mainBar/UserSection';
import useStyles from './mainBar/useStyles';

const MainBar = () => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="space-between" className={classes.root}>
      <HospitalSection />
      <UserSection />
    </Grid>
  );
};

export default MainBar;
