import Grid from '@material-ui/core/Grid';
import FormHeading from 'components/FormHeading';
import FormRow from 'components/FormRow';
import LeftFormContainer from 'components/LeftFormContainer';
import RightFormContainer from 'components/RightFormContainer';
import TitledInput from 'components/TitledInput';
import React from 'react';

import PatientIdentification from './PatientIdentification';
import useForm from './headerSectionPS/useForm';
import useStyles from './headerSectionPS/useStyles';

const HeaderSectionPS = ({ className, isRequiredError }, ref) => {
  const { isPreSurgicalDiagnosticInputOnError, isProposedSurgeonInputOnError } = ref;
  const classes = useStyles();

  const [
    initialState,
    { handlePreSurgicalDiagnosticDebounced, handleProposedSurgeonDebounced },
  ] = useForm();

  const { headingSection, currentPatient } = initialState;
  return (
    <Grid container className={className}>
      <FormHeading className={classes.rowBottomMargin} text=" Ficha Pre-Anestésica." />
      <FormRow>
        <LeftFormContainer className={classes.rowContainer}>
          <PatientIdentification values={currentPatient} />
        </LeftFormContainer>
        <RightFormContainer className={classes.rightContainerAligment}>
          <TitledInput
            inputTitle="Diagnóstico Pre-Operatorio:"
            placeholder="Diagnóstico Pre-Operatorio"
            className={classes.rowBottomMargin}
            maxLength={40}
            value={headingSection['preSurgicalDiagnostic']}
            nestedHandler={handlePreSurgicalDiagnosticDebounced}
            isRequiredError={isRequiredError['preSurgicalDiagnosticIsRequired']}
            ref={isPreSurgicalDiagnosticInputOnError}
          />
          <TitledInput
            inputTitle="Cirugía Propuesta:"
            placeholder="Cirugía Propuesta"
            maxLength={40}
            value={headingSection['proposedSurgeon']}
            nestedHandler={handleProposedSurgeonDebounced}
            isRequiredError={isRequiredError['proposedSurgeonIsRequired']}
            ref={isProposedSurgeonInputOnError}
          />
        </RightFormContainer>
      </FormRow>
    </Grid>
  );
};

export default React.memo(React.forwardRef(HeaderSectionPS));
