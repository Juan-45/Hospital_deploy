import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import StandarDateInput from './StandarDateInput';
import TitledItem from './TitledItem';
import useStyles from './titledDateInput/useStyles';

const TitledDateInput = ({ inputTitle, className, error, ...props }) => {
  const classes = useStyles();
  return (
    <TitledItem title={inputTitle} className={className}>
      <Grid
        container
        alignItems="flex-start"
        className={clsx(classes.root, error && classes.error)}
      >
        <StandarDateInput type="date" {...props} />
      </Grid>
    </TitledItem>
  );
};

export default TitledDateInput;
