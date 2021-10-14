import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import useStyles from './validationMessage/useStyles';

const ValidationMessage = ({ title, text, shouldDisplay, className, headerClassName }) => {
  const classes = useStyles();

  return (
    <>
      {shouldDisplay && (
        <Grid container direction="column" alignItems="flex-start" className={className}>
          <Typography
            variant="h6"
            align="left"
            className={clsx(classes.rowBottomMargin, headerClassName)}
          >
            {title}
          </Typography>
          <Typography align="left">{text}</Typography>
        </Grid>
      )}
    </>
  );
};
export default ValidationMessage;
