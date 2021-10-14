import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import useStyles from './barElement/useStyles';

const BarElement = ({ className, children, noBorder, grow, ...props }) => {
  const classes = useStyles();
  const containerClass = clsx(
    classes.container,
    !noBorder && classes.containerBorder,
    grow && classes.growClass,
    className
  );
  const responsiveContainer = (
    <Grid item className={containerClass} {...props} xs={false}>
      {children}
    </Grid>
  );
  const staticContainer = (
    <div className={containerClass} {...props}>
      {children}
    </div>
  );

  return props.container || props.item ? responsiveContainer : staticContainer;
};

export default BarElement;
