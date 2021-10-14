import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import InputNumber from 'components/InputNumber';
import SpacerCharacter from 'components/SpacerCharacter';
import TitledItem from 'components/TitledItem';
import React from 'react';

import useInput from './doubleFieldInput/useInput';
import useStyles from './doubleFieldInput/useStyles';

const DoubleFieldInput = (
  {
    title,
    inputProps,
    inputNames,
    placeholders,
    separatorCharacter,
    stateObj,
    nestedHandler,
    isRequiredError,
    measurementUnit,
    className,
  },
  ref
) => {
  const classes = useStyles();
  const [{ value1, value2, error }, { handleOnChangeOne, handleOnChangeTwo }] = useInput(
    stateObj,
    inputNames,
    nestedHandler,
    isRequiredError
  );

  const [ref1, ref2] = ref;

  return (
    <TitledItem title={title} className={className}>
      <Grid container direction="column" alignItems="flex-start">
        <Grid
          container
          wrap="nowrap"
          alignItems="flex-start"
          className={clsx(classes.container, error ? classes.containerError : null)}
        >
          <Grid item className={classes.inputContainer}>
            <InputNumber
              placeholder={placeholders[0]}
              inputProps={inputProps}
              value={value1}
              nestedHandler={handleOnChangeOne}
              ref={ref1}
            />
          </Grid>
          <SpacerCharacter className={clsx(classes.topPadding, classes.spacerCharacter)}>
            {separatorCharacter}
          </SpacerCharacter>
          <Grid item className={classes.inputContainer}>
            <InputNumber
              placeholder={placeholders[1]}
              inputProps={inputProps}
              value={value2}
              nestedHandler={handleOnChangeTwo}
              ref={ref2}
            />
          </Grid>
          {measurementUnit && (
            <Typography
              variant="body2"
              className={clsx(classes.topPadding, classes.measurementUnitText)}
            >
              {measurementUnit}
            </Typography>
          )}
        </Grid>
        {error && (
          <Typography variant="caption" className={classes.textError}>
            Ambos Campos Son Requeridos
          </Typography>
        )}
      </Grid>
    </TitledItem>
  );
};

export default React.forwardRef(DoubleFieldInput);
