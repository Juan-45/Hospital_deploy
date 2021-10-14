import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import InputNumber from 'components/InputNumber';
import TitledItem from 'components/TitledItem';
import React from 'react';

import useStyles from './titledInputWithUnit/useStyles';

const TitledInputWithUnit = ({ title, unit, inputWidthClassName, className, ...props }, ref) => {
  const classes = useStyles();

  return (
    <TitledItem title={title} className={clsx(classes.inputAlign, className)}>
      <Grid container wrap="nowrap" className={classes.innerContainer} alignItems="flex-start">
        <InputNumber
          className={clsx(inputWidthClassName, classes.individualInput)}
          placeholder={unit}
          ref={ref}
          {...props}
        />
        <Typography variant="body2" className={classes.unitText}>
          {unit}
        </Typography>
      </Grid>
    </TitledItem>
  );
};
export default React.forwardRef(TitledInputWithUnit);
