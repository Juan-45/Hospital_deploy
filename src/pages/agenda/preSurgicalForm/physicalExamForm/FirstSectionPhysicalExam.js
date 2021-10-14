import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import FormAddedItem from 'components/FormAddedItem';
import FormHeading from 'components/FormHeading';
import FormRow from 'components/FormRow';
import LeftFormContainer from 'components/LeftFormContainer';
import RightFormContainer from 'components/RightFormContainer';
import StandarButton from 'components/StandarButton';
import StandarSlider from 'components/StandarSlider';
import TitledInputWithUnit from 'components/TitledInputWithUnit';
import TitledItem from 'components/TitledItem';
import TitledTextAreaAutoSize from 'components/TitledTextAreaAutoSize';
import React from 'react';

import DoubleFieldInput from './DoubleFieldInput.js';
import DoubleSelectInput from './DoubleSelectInput';
import useForm from './firstSectionPhysicalExam/useForm';
import useStyles from './firstSectionPhysicalExam/useStyles';

const FirstSectionPhysicalExam = ({ className, isRequiredError, isUnresolvedError }, ref) => {
  const classes = useStyles();
  const [
    {
      weightState,
      heightState,
      vTFactorState,
      isRequired,
      bMIndexValue,
      bMIValue,
      bMICValue,
      tVValue,
      isUnresolved,
      physicalExams,
    },
    { isWeightInputOnErrorLocal, isHeightInputOnErrorLocal },
    {
      handleOnChangeFor,
      calculateOnClick,
      handleWeightDebounced,
      handleVTFactorDebounced,
      handleHeightDebounced,
      handlePulseDebounced,
      handleCardiacAuscultationDebounced,
      handlePulmonaryAuscultationDebounced,
      handleSpineDebounced,
      handlePainLevelDebounced,
      handleAsaLevelDebounced,
      handleObservationsDebounced,
    },
  ] = useForm(ref, isUnresolvedError);

  const {
    isRequiredErrorFirstSectionState,
    bloodPresureErrorState,
    bloodTypeErrorState,
  } = isRequiredError;

  const { weightInputError, heightInputError } = isRequired;
  const {
    cardiacAuscultation,
    pulmonaryAuscultation,
    spine,
    diastolicPressure,
    systolicPressure,
    pulse,
    asaLevel,
    painLevel,
    observations,
    bloodType,
    factorRh,
  } = physicalExams;

  const { bloodPresureForm, isPulseInputOnError } = ref;

  return (
    <Grid container className={className}>
      <FormHeading className={classes.rowBottomMargin} text="Exámen Físico." variant="body1" />
      <Grid container className={isUnresolved ? classes.isUnresolvedError : null}>
        <FormRow className={classes.rowBottomMargin}>
          <LeftFormContainer xs={6} className={classes.leftContainer}>
            <TitledInputWithUnit
              title="Peso:"
              inputProps={{
                decimalplaces: 1,
                max: 999,
              }}
              value={weightState}
              nestedHandler={handleWeightDebounced}
              unit="Kg"
              inputWidthClassName={classes.inputWidth}
              isRequiredError={
                weightInputError || isRequiredErrorFirstSectionState['weightIsRequired']
              }
              ref={isWeightInputOnErrorLocal}
            />
          </LeftFormContainer>
          <RightFormContainer xs={6}>
            <TitledInputWithUnit
              title="Altura:"
              inputProps={{
                max: 300,
              }}
              value={heightState}
              nestedHandler={handleHeightDebounced}
              unit="Cm"
              inputWidthClassName={classes.inputWidth}
              isRequiredError={
                heightInputError || isRequiredErrorFirstSectionState['heightIsRequired']
              }
              ref={isHeightInputOnErrorLocal}
            />
          </RightFormContainer>
        </FormRow>
        <LeftFormContainer sm={12} className={clsx(classes.leftContainer, classes.rowBottomMargin)}>
          <TitledItem title="Factor VT:">
            <StandarSlider
              marks={[
                { value: 2, label: '2 ml/Kg' },
                { value: 3, label: '3 ml/Kg' },
                { value: 4, label: '4 ml/Kg' },
                { value: 5, label: '5 ml/Kg' },
                { value: 6, label: '6 ml/Kg' },
                { value: 7, label: '7 ml/Kg' },
                { value: 8, label: '8 ml/Kg' },
                { value: 9, label: '9 ml/Kg' },
              ]}
              step={1}
              valueLabelDisplay="off"
              value={vTFactorState}
              nestedHandler={handleVTFactorDebounced}
              min={2}
              max={9}
              className={classes.sliders}
            />
          </TitledItem>
        </LeftFormContainer>
        <Grid container className={!isUnresolved ? classes.bottomLine : null}>
          <FormAddedItem className={!isUnresolved ? classes.rowBottomMargin : null}>
            <Grid container alignItems="flex-start">
              <Grid container item xs={6} direction="column" alignItems="flex-start">
                <Grid
                  container
                  alignItems="flex-start"
                  wrap="nowrap"
                  className={classes.rowContainer}
                >
                  <Grid
                    container
                    className={clsx(classes.textMarkContainer, classes.leftTextMarkContainer)}
                  >
                    <FormHeading
                      variant="body2"
                      className={clsx(classes.textMark, classes.textFirstSectionSpacing)}
                      text="IMC:"
                    />
                  </Grid>
                  <Typography
                    variant="body2"
                    className={clsx(classes.textSecondSectionSpacing, classes.textAligment)}
                  >
                    {`${bMIndexValue ? bMIndexValue : '- '} Kg/m2`}
                  </Typography>
                </Grid>
                <Grid
                  container
                  alignItems="flex-start"
                  wrap="nowrap"
                  className={classes.rowContainer}
                >
                  <Grid
                    container
                    className={clsx(classes.textMarkContainer, classes.leftTextMarkContainer)}
                  >
                    <FormHeading
                      variant="body2"
                      className={clsx(classes.textMark, classes.textFirstSectionSpacing)}
                      text="PIC:"
                    />
                  </Grid>
                  <Typography
                    variant="body2"
                    className={clsx(classes.textSecondSectionSpacing, classes.textAligment)}
                  >
                    {`${bMICValue ? bMICValue : '- '} Kg`}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container item xs={6} alignItems="flex-start">
                <Grid container alignItems="flex-start" wrap="nowrap">
                  <Grid
                    container
                    className={clsx(classes.textMarkContainer, classes.rightTextMarkContainer)}
                  >
                    <FormHeading
                      variant="body2"
                      className={clsx(classes.textMark, classes.textFirstSectionSpacing)}
                      text="PI:"
                    />
                  </Grid>
                  <Typography
                    variant="body2"
                    className={clsx(classes.textSecondSectionSpacing, classes.textAligment)}
                  >
                    {`${bMIValue ? bMIValue : '- '} Kg`}
                  </Typography>
                </Grid>
                <Grid container alignItems="flex-start" wrap="nowrap">
                  <Grid
                    container
                    className={clsx(classes.textMarkContainer, classes.rightTextMarkContainer)}
                  >
                    <FormHeading
                      variant="body2"
                      className={clsx(classes.textMark, classes.textFirstSectionSpacing)}
                      text="VT:"
                    />
                  </Grid>
                  <Typography
                    variant="body2"
                    className={clsx(classes.textSecondSectionSpacing, classes.textAligment)}
                  >
                    {`${tVValue ? tVValue : '- '} ml`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.rowContainerBottomLine} />
            <Grid container direction="column" alignItems="flex-start">
              <FormHeading
                variant="body2"
                className={clsx(classes.textMark, classes.textFirstSectionSpacing)}
                text="Fórmulas utilizadas:"
              />
              <Typography variant="caption" className={classes.formulaText} color="textSecondary">
                IMC = PESO/ALTURA 2
              </Typography>
              <Typography
                variant="caption"
                align="left"
                className={classes.formulaText}
                color="textSecondary"
              >
                PESO IDEAL: <br /> HOMBRE = 50 + 0.91*(ALTURA-152.4)
                <br />
                MUJER = 45.5 + 0.91*(ALTURA - 152.4)
              </Typography>
              <Typography variant="caption" className={classes.formulaText} color="textSecondary">
                PIC = PI + 0.25* (P-PI) (Fórmula de Wilkens)
              </Typography>
              <Typography variant="caption" color="textSecondary">
                VT = PI * factor VT
              </Typography>
            </Grid>
            <Grid className={classes.rowContainerBottomLine} />
            <Grid container justifyContent="flex-end">
              <StandarButton text="CALCULAR" onClick={calculateOnClick} />
            </Grid>
          </FormAddedItem>
        </Grid>
      </Grid>
      {isUnresolved && (
        <Typography
          variant="caption"
          className={clsx(classes.textError, isUnresolved && classes.rowBottomMargin)}
        >
          No ha presionado el botón Calcular o los resultados obtenidos están desactualizados, esto
          último se debe a que luego de calcular los valores cambió el valor de Peso, Altura o
          Factor VT, verifique que estos últimos datos sean correctos y presione Calcular, luego
          valide el formulario.
        </Typography>
      )}
      <FormRow className={classes.rowBottomMargin} alignItems="flex-start">
        <LeftFormContainer>
          <DoubleFieldInput
            inputNames={['systolicPressure', 'diastolicPressure']}
            systolicPressure
            title="Presión Arterial:"
            placeholders={['Sist.', 'Diast.']}
            Diast
            inputProps={{
              max: 250,
            }}
            separatorCharacter="/"
            measurementUnit="mmHg"
            nestedHandler={handleOnChangeFor}
            stateObj={[systolicPressure, diastolicPressure]}
            isRequiredError={bloodPresureErrorState}
            ref={bloodPresureForm}
          />
        </LeftFormContainer>
        <RightFormContainer>
          <TitledInputWithUnit
            title="Pulso:"
            inputProps={{
              max: 300,
            }}
            value={pulse}
            nestedHandler={handlePulseDebounced}
            unit="ppm"
            inputWidthClassName={classes.inputWidth}
            isRequiredError={isRequiredErrorFirstSectionState['pulseIsRequired']}
            ref={isPulseInputOnError}
          />
        </RightFormContainer>
      </FormRow>
      <FormRow className={classes.rowBottomMargin} alignItems="flex-start">
        <LeftFormContainer>
          <DoubleSelectInput
            title="Tipo de Sangre:"
            inputNames={['bloodType', 'factorRh']}
            placeholders={['Grupo', 'Factor']}
            stateObj={[bloodType, factorRh]}
            menuItemsArr={[
              [
                { value: 'O', label: 'O' },
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
                { value: 'AB', label: 'AB' },
              ],
              [
                { value: 'Rh (-)', label: 'Rh (-)' },
                { value: 'Rh (+)', label: 'Rh (+)' },
              ],
            ]}
            nestedHandler={handleOnChangeFor}
            isRequiredError={bloodTypeErrorState}
          />
        </LeftFormContainer>
        <RightFormContainer>
          <TitledTextAreaAutoSize
            title="Auscultación Cardiaca:"
            placeholder="/..Resultado..."
            nestedHandler={handleCardiacAuscultationDebounced}
            value={cardiacAuscultation}
            isRequiredError={isRequiredErrorFirstSectionState['cardiacAuscultationIsRequired']}
          />
        </RightFormContainer>
      </FormRow>
      <FormRow
        alignItems="flex-start"
        className={clsx(classes.rowBottomMargin, classes.bottomLine)}
      >
        <LeftFormContainer>
          <TitledTextAreaAutoSize
            title="Auscultación Pulmonar:"
            placeholder="/..Resultado..."
            nestedHandler={handlePulmonaryAuscultationDebounced}
            value={pulmonaryAuscultation}
            isRequiredError={isRequiredErrorFirstSectionState['pulmonaryAuscultationIsRequired']}
          />
        </LeftFormContainer>
        <RightFormContainer className={classes.rowBottomMargin}>
          <TitledTextAreaAutoSize
            title="Columna Vertebral:"
            placeholder="/..Observaciones..."
            nestedHandler={handleSpineDebounced}
            value={spine}
            isRequiredError={isRequiredErrorFirstSectionState['spineIsRequired']}
          />
        </RightFormContainer>
      </FormRow>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        className={clsx(classes.rowBottomMargin, classes.bottomLine)}
      >
        <TitledItem title="Grado de Dolor:" className={classes.rowBottomMargin}>
          <StandarSlider
            marks={[
              { value: 0, label: '0' },
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
              { value: 4, label: '4' },
              { value: 5, label: '5' },
              { value: 6, label: '6' },
              { value: 7, label: '7' },
              { value: 8, label: '8' },
              { value: 9, label: '9' },
              { value: 10, label: '10' },
            ]}
            defaultValue={0}
            step={1}
            valueLabelDisplay="off"
            value={painLevel}
            nestedHandler={handlePainLevelDebounced}
            min={0}
            max={10}
            className={classes.sliders}
          />
        </TitledItem>
        <TitledItem title="ASA:" className={classes.rowBottomMargin}>
          <StandarSlider
            marks={[
              { value: 1, label: 'I' },
              { value: 2, label: 'II' },
              { value: 3, label: 'III' },
              { value: 4, label: 'IV' },
              { value: 5, label: 'V' },
              { value: 6, label: 'VI' },
            ]}
            defaultValue={1}
            step={1}
            valueLabelDisplay="off"
            value={asaLevel}
            nestedHandler={handleAsaLevelDebounced}
            min={1}
            max={6}
            className={classes.sliders}
          />
        </TitledItem>
      </Grid>
      <TitledTextAreaAutoSize
        title="Observaciones:"
        placeholder="/..Observaciones..."
        nestedHandler={handleObservationsDebounced}
        value={observations}
        classNameTextArea={classes.textArea}
      />
    </Grid>
  );
};

export default React.forwardRef(FirstSectionPhysicalExam);
