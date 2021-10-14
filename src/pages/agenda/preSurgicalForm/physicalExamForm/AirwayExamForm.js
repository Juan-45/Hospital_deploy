import Grid from '@material-ui/core/Grid';
import DoubleRadioButtonInput from 'components/DoubleRadioButtonInput';
import FormHeading from 'components/FormHeading';
import FormRow from 'components/FormRow';
import LeftFormContainer from 'components/LeftFormContainer';
import RadioButtonsGroup from 'components/RadioButtonsGroup';
import RightFormContainer from 'components/RightFormContainer';
import TitledItem from 'components/TitledItem';
import TitledTextAreaAutoSize from 'components/TitledTextAreaAutoSize';
import { PreSurgical } from 'context/PreSurgical';
import { useContext } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import useStyles from './airwayExamForm/useStyles';

const AirwayExamForm = ({ className, isRequiredError }) => {
  const { initialState, updateGlobalState } = useContext(PreSurgical);
  const { airwayExams } = initialState;

  const {
    mouthOpening,
    malampati,
    thyromentalDistance,
    goniomentalDistance,
    neckMovement,
    teeth,
    difficultAirwayForetell,
    observations,
  } = airwayExams;

  const classes = useStyles();

  const updateState = (newValue) => {
    updateGlobalState((prevState) => ({
      ...prevState,
      airwayExams: {
        ...prevState['airwayExams'],
        ...newValue,
      },
    }));
  };

  const handleObservationsDebounced = useDebouncedCallback(
    (value) => {
      updateState({
        observations: value,
      });
    },
    250,
    { trailing: true }
  );

  const handleOnChangeFor = (name) => (value) => updateState({ [name]: value });

  return (
    <Grid container direction="column" alignItems="flex-start" className={className}>
      <FormHeading
        text="Examen de Vía Aerea."
        className={classes.rowBottomMargin}
        variant="body1"
      />
      <FormRow className={classes.rowBottomMargin}>
        <LeftFormContainer xs={6} className={classes.leftContainer}>
          <DoubleRadioButtonInput
            title="Apertura Bucal:"
            radioItemsArr={[
              { value: '< 3cm', label: '< 3cm' },
              { value: '> 3cm', label: '> 3cm' },
            ]}
            value={mouthOpening}
            nestedHandler={handleOnChangeFor('mouthOpening')}
            isRequiredError={isRequiredError['mouthOpeningIsRequired']}
          />
        </LeftFormContainer>
        <RightFormContainer xs={6}>
          <TitledItem title="Malampati:" className={classes.inputAlign}>
            <Grid container wrap="nowrap">
              <RadioButtonsGroup
                radioItemsArr={[
                  { value: 'I', label: 'I' },
                  { value: 'II', label: 'II' },
                  { value: 'III', label: 'III' },
                  { value: 'IV', label: 'IV' },
                ]}
                radioItemClassName={classes.radioItemMalampati}
                value={malampati}
                nestedHandler={handleOnChangeFor('malampati')}
                isRequiredError={isRequiredError['malampatiIsRequired']}
              />
            </Grid>
          </TitledItem>
        </RightFormContainer>
      </FormRow>
      <FormRow className={classes.rowBottomMargin}>
        <LeftFormContainer xs={6} className={classes.leftContainer}>
          <DoubleRadioButtonInput
            title="Distancia Tiromentoniana:"
            radioItemsArr={[
              { value: '< 6cm', label: '< 6cm' },
              { value: '> 6cm', label: '> 6cm' },
            ]}
            value={thyromentalDistance}
            nestedHandler={handleOnChangeFor('thyromentalDistance')}
            isRequiredError={isRequiredError['thyromentalDistanceIsRequired']}
          />
        </LeftFormContainer>
        <RightFormContainer xs={6}>
          <DoubleRadioButtonInput
            title="Distancia Goniomentoniana:"
            radioItemsArr={[
              { value: '< 9cm', label: '< 9cm' },
              { value: '> 9cm', label: '> 9cm' },
            ]}
            className={classes.inputAlign}
            value={goniomentalDistance}
            nestedHandler={handleOnChangeFor('goniomentalDistance')}
            isRequiredError={isRequiredError['goniomentalDistanceIsRequired']}
          />
        </RightFormContainer>
      </FormRow>
      <FormRow className={classes.rowBottomMargin}>
        <LeftFormContainer xs={6} className={classes.leftContainer}>
          <DoubleRadioButtonInput
            title="Movimiento de Cuello:"
            radioItemsArr={[
              { value: '< 100º', label: '< 100º' },
              { value: '> 100º', label: '> 100º' },
            ]}
            value={neckMovement}
            nestedHandler={handleOnChangeFor('neckMovement')}
            isRequiredError={isRequiredError['neckMovementIsRequired']}
          />
        </LeftFormContainer>
        <RightFormContainer xs={6}>
          <DoubleRadioButtonInput
            title="Dentadura:"
            radioItemsArr={[
              { value: 'incomplete', label: 'Incompleta' },
              { value: 'complete', label: 'Completa' },
            ]}
            radioItemStyle={classes.radioItem}
            className={classes.inputAlign}
            value={teeth}
            nestedHandler={handleOnChangeFor('teeth')}
            isRequiredError={isRequiredError['teethIsRequired']}
          />
        </RightFormContainer>
      </FormRow>
      <Grid container alignItems="flex-start" className={classes.bottomLine}>
        <DoubleRadioButtonInput
          title="Previsión de Vía Aerea Dificil:"
          radioItemsArr={[
            { value: 'yes', label: 'Sí' },
            { value: 'no', label: 'No' },
          ]}
          value={difficultAirwayForetell}
          nestedHandler={handleOnChangeFor('difficultAirwayForetell')}
          className={classes.rowBottomMargin}
          isRequiredError={isRequiredError['difficultAirwayForetellIsRequired']}
        />
      </Grid>
      <TitledTextAreaAutoSize
        title="Observaciones:"
        placeholder="/..Observaciones..."
        value={observations}
        nestedHandler={handleObservationsDebounced}
        classNameTextArea={classes.textArea}
      />
    </Grid>
  );
};

export default AirwayExamForm;
