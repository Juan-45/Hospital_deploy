import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import useStyles from './footer/useStyles';

const Footer = () => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Typography>Project for learning..¡</Typography>
    </Grid>
  );
};

export default Footer;
