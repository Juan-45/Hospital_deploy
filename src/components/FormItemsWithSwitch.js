import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import StandarSwitch from 'components/StandarSwitch';
import React from 'react';

import useStyles from './formItemsWithSwitch/useStyles';

const FormItemsWithSwitch = ({
  groupTitle,
  children,
  switchState,
  handleSwitch,
  className,
  childrenContainerStyles,
}) => {
  const classes = useStyles();
  return (
    <Grid container item direction="column" xs={12} alignItems="flex-start" className={className}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
        className={classes.formHeaderContainer}
      >
        <Typography>{groupTitle}</Typography>
        <StandarSwitch state={switchState} handleOnChange={handleSwitch} />
      </Grid>
      {switchState ? (
        <Grid
          container
          alignItems="flex-start"
          item
          xs={12}
          className={clsx(
            classes.childrenContainer,
            switchState && classes.renderedChildrenContainer,
            childrenContainerStyles
          )}
        >
          {children}
        </Grid>
      ) : null}
    </Grid>
  );
};

export default FormItemsWithSwitch;
