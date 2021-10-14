import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import FormAddedItem from 'components/FormAddedItem';
import FormHeading from 'components/FormHeading';
import RadioButtonsGroup from 'components/RadioButtonsGroup';
import StandarButton from 'components/StandarButton';
import TitledInput from 'components/TitledInput';
import TitledItem from 'components/TitledItem';
import TitledTextAreaAutoSize from 'components/TitledTextAreaAutoSize';
import React from 'react';

import useForm from './newStudyForm/useForm';
import useStyles from './newStudyForm/useStyles';

//FROM here, when the user adds a new study pressing the "add" button, the state must be updated, but also it is neccessary to send the corresponding data to the server,
const NewStudyForm = ({ className, setStateObj }) => {
  const [
    { formErrors, shouldReset, isStudyNameInputInError, isMeasurementUnitInputInError, studyType },
    {
      handleStudyNameDebounced,
      handleMeasurementUnitDebounced,
      handleStudyDescriptionDebounced,
      handleOnAdd,
      handleStudyType,
    },
  ] = useForm(setStateObj);

  const { studyNameRequired, studyTypeRequired, measurementUnitRequired } = formErrors;

  const classes = useStyles();

  return (
    <>
      <FormHeading variant="body1" className={classes.rowBottomMargin} text="Nuevo Estudio" />
      <FormAddedItem className={className}>
        <Grid container direction="column" alignItems="flex-start">
          <Grid container item xs={12} sm={6}>
            <TitledInput
              inputTitle="Nombre:"
              placeholder="Ingrese nombre del estudio que desea agregar"
              maxLength={20}
              className={classes.rowBottomMargin}
              shouldReset={shouldReset}
              nestedHandler={handleStudyNameDebounced}
              isRequiredError={studyNameRequired}
              ref={isStudyNameInputInError}
            />
          </Grid>
          <TitledItem
            title="Tipo:"
            className={clsx(classes.radioButtonsAlignment, classes.rowBottomMargin)}
          >
            <RadioButtonsGroup
              radioItemsArr={[
                { value: 'textual', label: 'Textual' },
                { value: 'numerical', label: 'Numérico' },
                { value: 'image', label: 'Imagen' },
              ]}
              nestedHandler={handleStudyType}
              isRequiredError={studyTypeRequired}
              shouldReset={shouldReset}
            />
          </TitledItem>
          <TitledInput
            inputTitle="Unidad de medida:"
            placeholder="Ingrese abreviatura. Ej. g/dl"
            maxLength={10}
            className={clsx(classes.rowBottomMargin, classes.unitInput)}
            nestedHandler={handleMeasurementUnitDebounced}
            disabled={studyType !== 'numerical'}
            isRequiredError={measurementUnitRequired}
            pattern={/^([a-zA-Z]+[2-3]?[/]?){1}([a-zA-Z]+[2-3]?)?$|^([%])?$|^([º]{1}[cCfFkK]?)?$/}
            ref={isMeasurementUnitInputInError}
            shouldReset={shouldReset}
          />
          <TitledTextAreaAutoSize
            title="Descripción:"
            placeholder="/..Descripción del estudio (Opcional)..."
            className={classes.rowBottomMargin}
            nestedHandler={handleStudyDescriptionDebounced}
            classNameTextArea={classes.textArea}
            shouldReset={shouldReset}
          />
        </Grid>
        <Grid className={classes.rowContainerBottomLine} />
        <Grid container alignItems="flex-start" justifyContent="flex-end">
          <StandarButton className={classes.button} text="+ NUEVO ESTUDIO" onClick={handleOnAdd} />
        </Grid>
      </FormAddedItem>
    </>
  );
};

export default React.memo(NewStudyForm);
