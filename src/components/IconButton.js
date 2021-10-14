import Button from '@material-ui/core/Button';
import clsx from 'clsx';

import useStyles from './iconButton/useStyles';

const IconButton = ({ startIcon, className, ...props }) => {
  const classes = useStyles();
  return (
    <Button
      size="small"
      startIcon={startIcon}
      className={clsx(classes['&.MuiButton-root'], className)}
      {...props}
    />
  );
};
export default IconButton;
