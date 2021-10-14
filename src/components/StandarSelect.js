import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';

import useInput from './standarSelect/useInput';
import useStyles from './standarSelect/useStyles';

const StandarSelect = ({
  menuItemsArr,
  placeholder,
  className,
  isRequiredError,
  value,
  nestedHandler,
  ...props
}) => {
  const classes = useStyles();
  const [valueState, handleOnChange] = useInput(value, nestedHandler);

  return (
    <FormControl className={clsx(classes.formControl, className)} error={isRequiredError}>
      <InputLabel id="placeholder">{placeholder}</InputLabel>
      <Select
        labelId="placeholder"
        MenuProps={{ disableScrollLock: true }}
        className={isRequiredError && classes.error}
        value={valueState}
        onChange={handleOnChange}
        {...props}
      >
        {menuItemsArr.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StandarSelect;
