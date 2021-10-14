import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import RadioButtonsGroup from 'components/RadioButtonsGroup';
import TitledItem from 'components/TitledItem';

import useStyles from './doubleRadioButtonInput/useStyles';

const DoubleRadioButtonInput = ({
  title,
  radioItemsArr,
  value,
  nestedHandler,
  measurementUnit,
  className,
  radioItemStyle,
  measurementTextStyle,
  name,
  isRequiredError,
}) => {
  const classes = useStyles();
  return (
    <TitledItem title={title} className={className}>
      <Grid container wrap="nowrap">
        <RadioButtonsGroup
          radioItemsArr={radioItemsArr}
          radioItemClassName={clsx(classes.radioItem, radioItemStyle)}
          value={value}
          nestedHandler={nestedHandler}
          name={name}
          isRequiredError={isRequiredError}
        />
        {measurementUnit && (
          <Typography variant="body2" className={clsx(classes.text, measurementTextStyle)}>
            {measurementUnit}
          </Typography>
        )}
      </Grid>
    </TitledItem>
  );
};
export default DoubleRadioButtonInput;
