import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import FormHeading from 'components/FormHeading';
import TitledItem from 'components/TitledItem';

import useStyles from './patientIdentification/useStyles';

const PatientIdentification = ({ className, values }) => {
  const { lastName, firstName, iDNumber, gender, age } = values;
  const classes = useStyles();
  return (
    <>
      <FormHeading
        className={clsx(classes.headingBottomMargin, className)}
        text="Datos del Paciente."
        variant="body1"
      />
      <TitledItem
        title={`Apellido:${'\u00A0'}`}
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Typography>{lastName}</Typography>
      </TitledItem>
      <TitledItem
        title={`Nombre:${'\u00A0'}`}
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Typography>{firstName}</Typography>
      </TitledItem>
      <TitledItem
        title={`DNI nro.:${'\u00A0'}`}
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Typography>{iDNumber}</Typography>
      </TitledItem>
      <TitledItem
        title={`Sexo:${'\u00A0'}`}
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        <Typography>{gender === 'male' ? 'Masculino' : 'femenino'}</Typography>
      </TitledItem>
      <TitledItem
        title={`Edad:${'\u00A0'}`}
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
        titlePaddingClassName={classes.lastChildren}
      >
        <Typography>{age}</Typography>
      </TitledItem>
    </>
  );
};

export default PatientIdentification;
