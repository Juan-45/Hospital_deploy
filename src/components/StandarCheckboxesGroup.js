import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import CheckboxItem from './standarCheckboxesGroup/CheckboxItem';
import useCheckboxesGroup from './standarCheckboxesGroup/useCheckboxesGroup';
import useStyles from './standarCheckboxesGroup/useStyles';

const StandarCheckboxesGroup = ({
  groupLabel,
  helperText,
  checkboxesArr,
  checkboxesState,
  nestedHandler,
  handleOnFocus,
  className,
  noWrap,
  evaluateValuesEffect,
  ...props
}) => {
  const classes = useStyles();
  const [setCheckboxesValues] = useCheckboxesGroup(evaluateValuesEffect);
  const checkboxesAmount = checkboxesArr.length;
  const noMoreThan8Wrap = noWrap && checkboxesAmount <= 8;
  const moreThan8Wrap = noWrap && checkboxesAmount > 8 && checkboxesAmount < 13;
  const moreThan12Wrap = noWrap && checkboxesAmount > 12 && checkboxesAmount < 17;
  const moreThan16Wrap = noWrap && checkboxesAmount > 16;

  let checkboxesColumnsArr = [];
  let counter = 1;
  let columArr = [];

  const checkboxItemsArr = checkboxesArr.map((item) => {
    const currentKey = item['name'];
    const currentLabel = item['label'];
    return (
      <CheckboxItem
        initialState={checkboxesState[currentKey]}
        nestedHandler={nestedHandler}
        setGroupState={setCheckboxesValues}
        checkboxLabel={currentLabel}
        name={currentKey}
        key={currentKey}
        onFocus={handleOnFocus}
      />
    );
  });
  for (let item of checkboxItemsArr) {
    columArr.push(item);
    if (columArr.length === 4 || checkboxItemsArr.length === counter) {
      checkboxesColumnsArr.push(
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          className={clsx(
            classes.checkboxesColumn,
            noWrap ? classes.noWrapChildren : classes.noWrapWithOutSlider,
            noMoreThan8Wrap && classes.noWrapWithOutSlider,
            moreThan8Wrap && classes.scrollOnAmountMoreThan8Children,
            moreThan12Wrap && classes.scrollOnAmountMoreThan12Children,
            moreThan16Wrap && classes.scrollOnAmountMoreThan16Children
          )}
          key={`checkboxesColumn${counter}`}
        >
          {columArr}
        </Grid>
      );
      columArr = [];
    }
    counter++;
  }

  return (
    <FormControl component="fieldset" className={className} {...props}>
      {groupLabel && <FormLabel component="legend">{groupLabel}</FormLabel>}
      <FormGroup>
        <Grid
          container
          alignItems="flex-start"
          wrap={noWrap ? 'nowrap' : 'wrap'}
          className={clsx(
            noWrap && classes.noWrapContainer,
            moreThan8Wrap && classes.scrollOnAmountMoreThan8Container,
            moreThan12Wrap && classes.scrollOnAmountMoreThan12Container,
            moreThan16Wrap && classes.scrollOnAmountMoreThan16Container
          )}
        >
          {checkboxesColumnsArr}
        </Grid>
      </FormGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default StandarCheckboxesGroup;
