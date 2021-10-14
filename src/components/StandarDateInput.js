import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import {
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import clsx from 'clsx';

import useInput from './standarDateInput/useInput';
import useStyles from './standarDateInput/useStyles';

const StandarDateInput = ({
  type,
  value,
  isRequiredError,
  className,
  shouldReset,
  nestedHandler,
  ...props
}) => {
  const classes = useStyles();
  const [inputState, handleOnChange] = useInput(value, isRequiredError, shouldReset, nestedHandler);
  const { helperText, errorState, valueState } = inputState;

  const inputToRender = [];
  const standarProps = {
    variant: 'inline',
    maskChar: '-',
    invalidDateMessage: 'Formato Invalido',
    maxDateMessage: 'La fecha no puede ser mayor al límite',
    minDateMessage: 'La fecha no puede ser menor al límite',
    minDate: new Date('1900', '01', '01'),
    maxDate: new Date('2040', '01', '01'),
  };

  if (type === 'date') {
    inputToRender.push(
      <FormControl error={errorState} key="typeDate">
        <KeyboardDatePicker
          className={clsx(className, classes.container, errorState && classes.error)}
          {...standarProps}
          value={valueState}
          onChange={handleOnChange}
          {...props}
        />
        {helperText && <FormHelperText className={classes.textError}>{helperText}</FormHelperText>}
      </FormControl>
    );
  } else if (type === 'time') {
    inputToRender.push(
      <FormControl error={errorState} key="typeTime">
        <KeyboardTimePicker
          className={clsx(className, classes.container, errorState && classes.error)}
          {...standarProps}
          value={valueState}
          onChange={handleOnChange}
          {...props}
        />
        {helperText && <FormHelperText className={classes.textError}>{helperText}</FormHelperText>}
      </FormControl>
    );
  } else {
    inputToRender.push(
      <FormControl error={errorState} key="typeDateTime">
        <KeyboardDateTimePicker
          className={clsx(className, classes.container, errorState && classes.error)}
          {...standarProps}
          value={valueState}
          onChange={handleOnChange}
          {...props}
        />
        {helperText && <FormHelperText className={classes.textError}>{helperText}</FormHelperText>}
      </FormControl>
    );
  }

  return <>{inputToRender}</>;
};

export default StandarDateInput;
