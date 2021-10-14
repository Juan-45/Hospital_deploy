import Typography from '@material-ui/core/Typography';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import BarElement from 'components/BarElement';
import IconButton from 'components/IconButton';

import useStyles from './dateNav/useStyles';

const DateNav = ({ date }) => {
  const classes = useStyles();
  return (
    <BarElement container justifyContent="space-between" noBorder className={classes.root}>
      <IconButton startIcon={<ArrowBackIosRoundedIcon />} />
      <Typography>{date}</Typography>
      <IconButton startIcon={<ArrowForwardIosRoundedIcon />} />
    </BarElement>
  );
};

export default DateNav;
