import clsx from 'clsx';
import FormItemsWithSwitch from 'components/FormItemsWithSwitch';
import PreSurgicalModalChildren from 'components/PreSurgicalFormChildrenModal';
import StandarCheckboxesGroup from 'components/StandarCheckboxesGroup';
import StandarModal from 'components/StandarModal';
import StandarTextareaAutosize from 'components/StandarTextareaAutosize';

import useForm from './preSurgicalClinicalGenericItem/useForm';
import useStyles from './preSurgicalClinicalGenericItem/useStyles';

const PreSurgicalClinicalGenericItem = ({
  groupTitle,
  checkboxesArr,
  setFormState,
  currentShallowStateKey,
  formValues,
  textAreaPlaceHolder,
  textAreaClassName,
  className,
}) => {
  const classes = useStyles();
  const [
    { shouldRender, shouldDisplayModal, areThereCheckboxes, checkboxes, observations },
    {
      handleSwitch,
      handleAcceptButton,
      handleCancelButton,
      handleCheckboxes,
      evaluateCheckboxesGroupValue,
      handleObservationsDebounced,
      evaluateTextAreaValue,
    },
  ] = useForm(setFormState, currentShallowStateKey, formValues);

  return (
    <FormItemsWithSwitch
      groupTitle={`${groupTitle}:`}
      className={className}
      switchState={shouldRender}
      handleSwitch={handleSwitch}
    >
      <StandarModal openState={shouldDisplayModal}>
        <PreSurgicalModalChildren
          text={`Todos los datos cargados para "${groupTitle}" se perderán, ¿está seguro que desea continuar?.`}
          handleAcceptButton={handleAcceptButton}
          handleCancelButton={handleCancelButton}
        />
      </StandarModal>
      {areThereCheckboxes ? (
        <StandarCheckboxesGroup
          checkboxesArr={checkboxesArr}
          nestedHandler={handleCheckboxes}
          checkboxesState={checkboxes}
          className={classes.checkBoxesGroup}
          evaluateValuesEffect={evaluateCheckboxesGroupValue}
        />
      ) : null}
      <StandarTextareaAutosize
        placeholder={textAreaPlaceHolder}
        className={clsx(classes.textArea, textAreaClassName)}
        value={observations}
        nestedHandler={handleObservationsDebounced}
        evaluateValueEffect={evaluateTextAreaValue}
      />
    </FormItemsWithSwitch>
  );
};

export default PreSurgicalClinicalGenericItem;
