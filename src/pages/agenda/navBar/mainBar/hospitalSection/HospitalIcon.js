import LocalHospitalOutlinedIcon from '@material-ui/icons/LocalHospitalOutlined';

import useStyles from './hospitalIcon/useStyles';

const HospitalIcon = () => {
  const classes = useStyles();
  return <LocalHospitalOutlinedIcon fontSize="large" className={classes.hospitalIcon} />;
};

export default HospitalIcon;
