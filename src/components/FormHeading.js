import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import useStyles from './formHeading/useStyles';

const FormHeading = ({ text, className, ...props }) => {
  const classes = useStyles();
  return (
    <Typography variant="h6" className={clsx(classes.headingRow, className)} {...props}>
      {text}
    </Typography>
  );
};

export default FormHeading;
