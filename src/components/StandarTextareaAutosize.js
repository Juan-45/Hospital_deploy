import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import clsx from 'clsx';

import useInput from './standarTextareaAutosize/useInput';
import useStyles from './standarTextareaAutosize/useStyles';

const StandarTextareaAutosize = ({
  placeholder,
  id,
  className,
  isRequiredError,
  value,
  nestedHandler,
  evaluateValueEffect,
  shouldReset,
  ...props
}) => {
  const classes = useStyles();
  const [inputState, handleOnChange, removeWhiteSpacesOnBlur] = useInput(
    isRequiredError,
    value,
    nestedHandler,
    evaluateValueEffect,
    shouldReset
  );
  const { helperText, errorState, valueState } = inputState;

  return (
    <FormControl error={errorState} className={clsx(className, classes.formControl)}>
      <TextareaAutosize
        placeholder={placeholder}
        id={id}
        className={clsx(classes.root, errorState && classes.error)}
        minRows={3}
        cols="80"
        value={valueState}
        onChange={handleOnChange}
        onBlur={removeWhiteSpacesOnBlur}
        {...props}
      />
      {errorState && <FormHelperText className={classes.textError}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default StandarTextareaAutosize;
