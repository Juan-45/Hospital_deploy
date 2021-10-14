import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import StandarSelect from 'components/StandarSelect';
import TitledItem from 'components/TitledItem';

import useInput from './doubleSelectInput/useInput';
import useStyles from './doubleSelectInput/useStyles';

const DoubleSelectInput = ({
  title,
  inputNames,
  placeholders,
  stateObj,
  menuItemsArr,
  nestedHandler,
  isRequiredError,
}) => {
  const classes = useStyles();
  const [value1, value2, error] = useInput(stateObj, isRequiredError);

  return (
    <TitledItem title={title}>
      <Grid container alignItems="flex-start" wrap="nowrap">
        <Grid
          container
          wrap="nowrap"
          alignItems="flex-start"
          spacing={2}
          className={clsx(classes.container, error ? classes.containerError : null)}
        >
          <StandarSelect
            name={inputNames[0]}
            placeholder={placeholders[0]}
            menuItemsArr={menuItemsArr[0]}
            className={classes.leftSelectInput}
            value={value1}
            nestedHandler={nestedHandler(inputNames[0])}
          />
          <StandarSelect
            name={inputNames[1]}
            placeholder={placeholders[1]}
            menuItemsArr={menuItemsArr[1]}
            value={value2}
            nestedHandler={nestedHandler(inputNames[1])}
          />
        </Grid>
      </Grid>
      {error && (
        <Typography variant="caption" className={classes.textError}>
          Ambos Campos Son Requeridos
        </Typography>
      )}
    </TitledItem>
  );
};

export default DoubleSelectInput;
