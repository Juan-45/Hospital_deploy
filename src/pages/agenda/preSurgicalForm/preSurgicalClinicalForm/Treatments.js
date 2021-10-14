import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import FormItemsWithSwitch from 'components/FormItemsWithSwitch';
import FormRow from 'components/FormRow';
import LeftFormContainer from 'components/LeftFormContainer';
import PreSurgicalFormChildrenModal from 'components/PreSurgicalFormChildrenModal';
import RadioButtonsGroup from 'components/RadioButtonsGroup';
import RightFormContainer from 'components/RightFormContainer';
import StandarButton from 'components/StandarButton';
import StandarModal from 'components/StandarModal';
import StandarTextareaAutosize from 'components/StandarTextareaAutosize';
import TitledDateInput from 'components/TitledDateInput';
import TitledInput from 'components/TitledInput';
import TitledItem from 'components/TitledItem';
import React from 'react';

import TreatmentsList from './treatments/TreatmentsList';
import useForm from './treatments/useForm';
import useStyles from './treatments/useStyles';

const Treatments = ({ formValues, setFormState, className, isUnresolvedError }, ref) => {
  const classes = useStyles();
  const [
    {
      shouldRender,
      shouldDisplayModal,
      formErrors,
      isUnresolved,
      isDrugInputOnErrorRef,
      isStartingDateValidated,
      shouldReset,
      drugValue,
      radioButtonValue,
      treatmentsPropsArr,
    },
    {
      handleSwitch,
      handleAcceptButton,
      handleCancelButton,
      handleRadioOnChange,
      handleDrugValueDebounced,
      handleObservationsDebounced,
      handleStartingTreatmentDateValueDebounced,
      handleEndingTreatmentDateValueDebounced,
      handleAddTreatment,
      setStateObjTreatment,
    },
  ] = useForm({
    formValues,
    setFormState,
    isUnresolvedError,
    ref,
  });

  const {
    isDrugInputOnError,
    isStartingDateInputOnError,
    isEndingDateInputOnError,
    isObservationsInputOnError,
  } = formErrors;

  return (
    <FormItemsWithSwitch
      groupTitle="Tratamientos"
      className={className}
      switchState={shouldRender}
      handleSwitch={handleSwitch}
    >
      <StandarModal openState={shouldDisplayModal}>
        <PreSurgicalFormChildrenModal
          text={`Todos los datos cargados para "Tratamientos" se perderán, así mismo en caso que haya rellenado algún formulario parcialmente, ¿está seguro que desea continuar?.`}
          handleAcceptButton={handleAcceptButton}
          handleCancelButton={handleCancelButton}
        />
      </StandarModal>
      <Grid
        container
        className={clsx(classes.topMargin, isUnresolved && classes.isUnresolvedError)}
      >
        <FormRow>
          <LeftFormContainer>
            <TitledInput
              inputTitle="Fármaco:"
              placeholder="Ingrese nombre del fármaco"
              maxLength={40}
              nestedHandler={handleDrugValueDebounced}
              isRequiredError={isDrugInputOnError}
              ref={isDrugInputOnErrorRef}
              shouldReset={shouldReset}
            />
          </LeftFormContainer>
          <RightFormContainer>
            <TitledDateInput
              inputTitle="Inicio de tratamiento:"
              format="dd/MM/yyyy"
              nestedHandler={handleStartingTreatmentDateValueDebounced}
              maxDateMessage="La fecha no puede ser mayor a la actual"
              disabled={drugValue === ''}
              disableFuture={true}
              className={classes.rowBottomMargin}
              isRequiredError={isStartingDateInputOnError}
              shouldReset={shouldReset}
            />
          </RightFormContainer>
        </FormRow>
        <Grid container wrap="nowrap" className={clsx(classes.topMargin, classes.rowBottomMargin)}>
          <TitledItem title="Suspender medicación." className={classes.radioButtonsAlignment}>
            <RadioButtonsGroup
              radioItemsArr={[
                { value: 'yes', label: 'Sí' },
                { value: 'no', label: 'No' },
              ]}
              nestedHandler={handleRadioOnChange}
              disabled={!isStartingDateValidated}
              value={radioButtonValue}
            />
          </TitledItem>
          <TitledDateInput
            inputTitle="Para fecha:"
            format="dd/MM/yyyy"
            nestedHandler={handleEndingTreatmentDateValueDebounced}
            disablePast={true}
            disabled={radioButtonValue === 'no'}
            className={clsx(classes.rowBottomMargin, classes.dateInputLeftPadding)}
            isRequiredError={isEndingDateInputOnError}
            shouldReset={shouldReset}
          />
        </Grid>
        <Grid container className={classes.rowContainer}>
          <StandarTextareaAutosize
            placeholder="/..Observaciones..."
            className={clsx(classes.rowBottomMargin, classes.textArea)}
            nestedHandler={handleObservationsDebounced}
            isRequiredError={isObservationsInputOnError}
            shouldReset={shouldReset}
          />
        </Grid>
        <Grid container justifyContent="flex-end" alignItems="flex-start">
          <StandarButton text="Agregar Tratamiento" onClick={handleAddTreatment} />
        </Grid>
      </Grid>
      {isUnresolved && (
        <Typography
          variant="caption"
          className={clsx(
            classes.textError,
            treatmentsPropsArr.length > 1 && classes.rowBottomMargin
          )}
        >
          Hay datos sin agregar complete el formulario o vacie los campos si son innecesarios, luego
          vuelva a intentar la validación.
        </Typography>
      )}
      {treatmentsPropsArr.length >= 1 && (
        <TreatmentsList
          className={!isUnresolved ? classes.rowTopMargin : null}
          itemsToRenderProps={treatmentsPropsArr}
          setStateObj={setStateObjTreatment}
        />
      )}
    </FormItemsWithSwitch>
  );
};

export default React.forwardRef(Treatments);
