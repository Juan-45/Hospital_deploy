import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import useStyles from './titledItem/useStyles';

const TitledItem = ({ title, children, className, titlePaddingClassName, ...props }) => {
  const classes = useStyles();
  return (
    <Grid
      xs={12}
      item
      container
      direction="column"
      alignItems="flex-start"
      className={className}
      {...props}
    >
      <Typography className={clsx(classes.textMargin, titlePaddingClassName)}>{title}</Typography>
      {children}
    </Grid>
  );
};

export default TitledItem;
