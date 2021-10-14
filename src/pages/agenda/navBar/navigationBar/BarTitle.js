import Typography from '@material-ui/core/Typography';
import BarElement from 'components/BarElement';

import useStyles from './barTitle/useStyles';

const BarTitle = ({ sectionName }) => {
  const classes = useStyles();
  return (
    <BarElement noBorder className={classes.root} container justifyContent="center">
      <Typography variant="h6">{sectionName}</Typography>
    </BarElement>
  );
};

export default BarTitle;
