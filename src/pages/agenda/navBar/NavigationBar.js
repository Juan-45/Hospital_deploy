import Grid from '@material-ui/core/Grid';
import BarElement from 'components/BarElement';
import Input from 'components/Input';

import BarTitle from './navigationBar/BarTitle';
import DateNav from './navigationBar/DateNav';
import useStyles from './navigationBar/useStyles';

//GUIDELANCE: Depending on the current section of the App render conditionally text in BarTitle, and render DateNav only when Agenda is rendered

//GUIDELANCE when some of the buttons of DateNav they been pressed will fire a request of a specified quantity of item with the corresponding date

const NavigationBar = () => {
  const classes = useStyles();
  return (
    <Grid container wrap="nowrap" className={classes.root}>
      <BarTitle sectionName="Agenda" />
      <BarElement noBorder grow className={classes.barElement}>
        <Input
          placeholder="Buscar Paciente por nombre o DNI"
          id="mainSearchBar"
          className={classes.input}
        />
      </BarElement>
      <DateNav date="01/ Oct/ 2020" />
    </Grid>
  );
};

export default NavigationBar;
