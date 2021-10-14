import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import useCheckbox from './checkboxItem/useCheckbox';
import useStyles from './checkboxItem/useStyles';

const CheckboxItem = ({
  initialState,
  setGroupState,
  nestedHandler,
  onFocus,
  name,
  checkboxLabel,
}) => {
  const classes = useStyles();
  const [value, handleOnChange] = useCheckbox(nestedHandler, initialState, setGroupState, name);
  return (
    <FormControlLabel
      control={<Checkbox checked={value} onChange={handleOnChange} name={name} />}
      label={checkboxLabel}
      className={classes.labelText}
      onFocus={onFocus}
      name={name}
    />
  );
};

export default CheckboxItem;
