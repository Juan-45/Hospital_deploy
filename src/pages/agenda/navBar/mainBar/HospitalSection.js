import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import HospitalIcon from './hospitalSection/HospitalIcon';

const HospitalSection = () => (
  <Grid container item wrap="nowrap" xs={4}>
    <HospitalIcon />
    <Grid container direction="column" alignItems="flex-start">
      <Typography variant="button">SAN FELIPE</Typography>
      <Typography color="textSecondary" variant="body2">
        MORENO 31
      </Typography>
    </Grid>
  </Grid>
);

export default HospitalSection;
