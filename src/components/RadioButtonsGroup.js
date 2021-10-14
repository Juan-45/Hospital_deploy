import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import clsx from 'clsx';
import React from 'react';

import useInput from './radioButtonsGroup/useInput';
import useStyles from './radioButtonsGroup/useStyles';

const RadioButtonsGroup = ({
  radioItemsArr,
  showInColumn,
  nestedHandler,
  value,
  disabled,
  radioItemClassName,
  isRequiredError,
  name,
  shouldReset,
}) => {
  const classes = useStyles();

  const [inputState, handleOnChange] = useInput(value, isRequiredError, shouldReset, nestedHandler);

  const { helperText, errorState, valueState } = inputState;

  let radioColumnsArr = [];
  let counter = 1;
  let columArr = [];
  if (showInColumn) {
    const radioButtonsArr = radioItemsArr.map((item) => {
      const currentValue = item['value'];
      const currentLabel = item['label'];
      return (
        <FormControlLabel
          control={<Radio />}
          key={currentValue}
          value={currentValue}
          label={currentLabel}
          disabled={disabled}
          className={clsx(classes.radioItem, radioItemClassName)}
        />
      );
    });
    for (let item of radioButtonsArr) {
      columArr.push(item);
      if (columArr.length === 4 || radioButtonsArr.length === counter) {
        radioColumnsArr.push(
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            className={clsx(
              classes.radioButtonsColumn,
              errorState && classes.radioButtonsColumnError
            )}
            key={`radioButtonsColumn${counter}`}
          >
            {columArr}
          </Grid>
        );
        columArr = [];
      }
      counter++;
    }
  }

  return (
    <FormControl component="fieldset" error={errorState}>
      <FormLabel component="legend">{''}</FormLabel>
      <RadioGroup value={valueState} onChange={handleOnChange} name={name}>
        <Grid
          container
          alignItems="flex-start"
          className={clsx(classes.radioButtonsContainer, errorState && classes.error)}
        >
          {showInColumn && radioColumnsArr}
          {!showInColumn &&
            radioItemsArr.map((item) => (
              <FormControlLabel
                control={<Radio />}
                key={item.value}
                value={item.value}
                label={item.label}
                disabled={disabled}
                className={clsx(classes.radioItem, radioItemClassName)}
              />
            ))}
        </Grid>
      </RadioGroup>
      {errorState && <FormHelperText className={classes.textError}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
export default RadioButtonsGroup;
