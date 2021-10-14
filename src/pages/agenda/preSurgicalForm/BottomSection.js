import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import DoubleRadioButtonInput from 'components/DoubleRadioButtonInput';
import FormHeading from 'components/FormHeading';
import FormRow from 'components/FormRow';
import LeftFormContainer from 'components/LeftFormContainer';
import RadioButtonsGroup from 'components/RadioButtonsGroup';
import RightFormContainer from 'components/RightFormContainer';
import TitledTextAreaAutoSize from 'components/TitledTextAreaAutoSize';
import React from 'react';

import useForm from './bottomSection/useForm';
import useStyles from './bottomSection/useStyles';

const BottomSection = ({ className, isRequiredError }) => {
  const classes = useStyles();

  const [
    initialState,
    {
      handlePsychicStateDebounced,
      handlePsychicStateObservationDebounced,
      handleAnestheticPlanDebounced,
      handleAnestheticPlanObservationDebounced,
      handleBloodSampleRequestDebounced,
      handleICURequestDebounced,
      handleInterconsultationsDebounced,
      handleExtraObservationsDebounced,
    },
  ] = useForm();

  const {
    psychicState,
    psychicStateObservation,
    anestheticPlan,
    anestheticPlanObservation,
    bloodSampleRequest,
    iCURequest,
    interconsultations,
    extraObservations,
  } = initialState;

  return (
    <Grid container direction="column" alignItems="flex-start" className={className}>
      <FormHeading
        text="Estado Psíquico Preoperatorio."
        className={classes.rowBottomMargin}
        variant="body1"
      />
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        className={classes.rowBottomMargin}
      >
        <Grid container className={clsx(classes.rowBottomMargin, classes.bottomLine)}>
          <RadioButtonsGroup
            radioItemsArr={[
              { value: 'normal', label: 'Normal' },
              { value: 'depress', label: 'Deprimido' },
              { value: 'anxious', label: 'Ansioso' },
              { value: 'exited', label: 'Exitado' },
              { value: 'comatose', label: 'Comatoso' },
              { value: 'hyperemotive', label: 'Hiperemotivo' },
            ]}
            showInColumn
            name="psychicState"
            nestedHandler={handlePsychicStateDebounced}
            value={psychicState}
            isRequiredError={isRequiredError['psychicStateIsRequired']}
          />
        </Grid>
        <TitledTextAreaAutoSize
          title="Observaciones:"
          placeholder="/..Observaciones..."
          value={psychicStateObservation}
          nestedHandler={handlePsychicStateObservationDebounced}
          classNameTextArea={classes.textArea}
        />
      </Grid>
      <FormHeading
        text="Plan Anestésico Sugerido."
        className={classes.rowBottomMargin}
        variant="body1"
      />
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        className={classes.rowBottomMargin}
      >
        <Grid container className={clsx(classes.rowBottomMargin, classes.bottomLine)}>
          <RadioButtonsGroup
            radioItemsArr={[
              { value: 'generalAnesthesia', label: 'Anestesia General' },
              { value: 'subarachnoid', label: 'Subaracnoidea' },
              { value: 'peridural', label: 'Peridural' },
              { value: 'peripheralLock', label: 'Bloqueo Periférico' },
              { value: 'sedation', label: 'Sedación' },
              { value: 'combined', label: 'Combinada' },
            ]}
            name="anestheticPlan"
            nestedHandler={handleAnestheticPlanDebounced}
            value={anestheticPlan}
            showInColumn
            isRequiredError={isRequiredError['anestheticPlanIsRequired']}
          />
        </Grid>
        <TitledTextAreaAutoSize
          title="Observaciones:"
          placeholder="/..Observaciones..."
          value={anestheticPlanObservation}
          nestedHandler={handleAnestheticPlanObservationDebounced}
          classNameTextArea={classes.textArea}
        />
      </Grid>
      <FormHeading text="Extras." className={classes.rowBottomMargin} variant="body1" />
      <FormRow className={classes.rowBottomMargin}>
        <LeftFormContainer xs={6} className={classes.leftContainer}>
          <DoubleRadioButtonInput
            title="Solicitud de Sangre:"
            radioItemsArr={[
              { value: 'yes', label: 'Sí' },
              { value: 'no', label: 'No' },
            ]}
            name="bloodSampleRequest"
            nestedHandler={handleBloodSampleRequestDebounced}
            value={bloodSampleRequest}
          />
        </LeftFormContainer>
        <RightFormContainer xs={6}>
          <DoubleRadioButtonInput
            title="Solicitud de UTI:"
            radioItemsArr={[
              { value: 'yes', label: 'Sí' },
              { value: 'no', label: 'No' },
            ]}
            name="iCURequest"
            nestedHandler={handleICURequestDebounced}
            value={iCURequest}
          />
        </RightFormContainer>
      </FormRow>

      <Grid
        container
        alignItems="flex-start"
        className={clsx(classes.rowBottomMargin, classes.bottomLineFullPadding)}
      >
        <TitledTextAreaAutoSize
          title="Interconsultas:"
          placeholder="/..Interconsultas..."
          value={interconsultations}
          nestedHandler={handleInterconsultationsDebounced}
          classNameTextArea={classes.textArea}
        />
      </Grid>
      <TitledTextAreaAutoSize
        title="Observaciones:"
        placeholder="/..Observaciones..."
        value={extraObservations}
        nestedHandler={handleExtraObservationsDebounced}
        classNameTextArea={classes.textArea}
      />
    </Grid>
  );
};

export default React.memo(BottomSection);
