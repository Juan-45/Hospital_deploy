import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import createArrFromObject from 'helpers/createArrFromObj';
import getItems from 'helpers/getItems';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useForm = ({ formValues, setFormState, isUnresolvedError, ref }) => {
  const defaultInputErrors = {
    drugInputRequired: false,
    startingDateRequired: false,
    endingDateRequired: false,
    observationsRequired: false,
  };

  const { shouldDisplay, ...treatmentsProps } = formValues;
  const [shouldRender, setShouldRender] = useState(shouldDisplay);
  const [shouldDisplayModal, setShouldDisplayModal] = useState(false);
  const [drugValue, setDrugValue] = useState('');
  const [radioButtonValue, setRadioButtonValue] = useState();
  const [observations, setObservations] = useState('');
  const [startingTreatmentDateValue, setStartingTreatmentDateValue] = useState(null);
  const [endingTreatmentDateValue, setEndingTreatmentDateValue] = useState(null);
  const [treatments, setTreatments] = useState(treatmentsProps);
  const [shouldReset, setShouldReset] = useState(false);
  const [formErrors, setFormErrors] = useState(defaultInputErrors);
  const [isUnresolved, setIsUnresolved] = useState(false);

  let isDrugInputOnErrorRef = useRef();

  const setStatesToDefaultOn = (range) => {
    const shouldResetAllStates = range === 'all';
    const shouldResetInputsState = range === 'inputs';
    const resetNestedFormsStates = () => {
      setStartingTreatmentDateValue(null);
      setEndingTreatmentDateValue(null);
      setDrugValue('');
      setRadioButtonValue('no');
      setObservations('');
      setFormErrors(defaultInputErrors);
      setShouldReset(true);
    };
    const resetAllStates = () => {
      resetNestedFormsStates();
      setTreatments({});
      setShouldRender((prevState) => !prevState);
    };
    if (shouldResetAllStates) {
      resetAllStates();
    } else if (shouldResetInputsState) {
      resetNestedFormsStates();
    }
  };

  const isStartingDateAfter = isAfter(startingTreatmentDateValue, new Date());
  const isStartingDateBefore = isBefore(startingTreatmentDateValue, new Date('1900', '01', '01'));

  const isEndingDateAfter = isAfter(endingTreatmentDateValue, new Date('2040', '01', '01'));

  const isStartingDateValidated =
    !isStartingDateAfter &&
    !isStartingDateBefore &&
    startingTreatmentDateValue !== null &&
    startingTreatmentDateValue != 'Invalid Date';

  const isEndingDateInputValueValidated =
    !isEndingDateAfter &&
    endingTreatmentDateValue !== null &&
    endingTreatmentDateValue != 'Invalid Date';

  const isDrugInputFilled = drugValue !== '';
  const treatmentsPropsArr = useMemo(() => createArrFromObject(treatments), [treatments]);
  const thereAreTreatmentToRender = treatmentsPropsArr.length > 1;

  const shouldHaveEndingDate = radioButtonValue === 'yes';
  const createTreatmentsObjFrom = ({
    drug,
    startingDateCondition,
    startingDate,
    shouldHaveEndingDateValue,
    endingDate,
    observationsValue,
  }) => (prevState) => {
    const getFormattedDateOn = (condition, date) => {
      if (condition) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      } else {
        return '';
      }
    };
    const startingDateValue = getFormattedDateOn(startingDateCondition, startingDate);
    const endingDateValue = getFormattedDateOn(shouldHaveEndingDateValue, endingDate);
    return {
      ...prevState,
      [drug]: {
        drug,
        startingTreatmentDate: startingDateValue,
        endingTreatmentDate: endingDateValue,
        ['observations']: observationsValue,
      },
    };
  };

  const createTreatmentsObj = createTreatmentsObjFrom({
    drug: drugValue,
    startingDateCondition: isStartingDateValidated,
    startingDate: startingTreatmentDateValue,
    shouldHaveEndingDateValue: shouldHaveEndingDate,
    endingDate: endingTreatmentDateValue,
    observationsValue: observations,
  });

  const addNewObjInGlobalState = (prevState) => {
    const shallowObj = prevState['treatments'];
    const stateObj = {
      ...prevState,
      ['treatments']: {
        shouldDisplay: true,
        ...createTreatmentsObj(shallowObj),
      },
    };
    return stateObj;
  };

  const setErrorFor = ({
    drug,
    observationsValue,
    startingDate,
    startingDateCondition,
    shouldHaveEndingDateValue,
    endingDateCondition,
  }) => () => {
    if (drug === '') {
      setFormErrors({
        ...defaultInputErrors,
        isDrugInputOnError: true,
      });
    } else if (observationsValue === '' && startingDate === null) {
      setFormErrors({
        ...defaultInputErrors,
        isStartingDateInputOnError: true,
        isObservationsInputOnError: true,
      });
    } else if (!startingDateCondition) {
      setFormErrors({
        ...defaultInputErrors,
        isStartingDateInputOnError: true,
      });
    } else if (shouldHaveEndingDateValue && !endingDateCondition) {
      setFormErrors({
        ...defaultInputErrors,
        isEndingDateInputOnError: true,
      });
    }
  };

  const setError = setErrorFor({
    drug: drugValue,
    startingDateCondition: isStartingDateValidated,
    startingDate: startingTreatmentDateValue,
    shouldHaveEndingDateValue: shouldHaveEndingDate,
    endingDateCondition: isEndingDateInputValueValidated,
    observationsValue: observations,
  });

  const handleSwitchFor = ({
    drugInputCondition,
    shouldRenderState,
    treatmentsToRenderCondition,
  }) => () => {
    const shouldDisplayModalCondition =
      shouldRenderState && (treatmentsToRenderCondition || drugInputCondition);
    if (shouldDisplayModalCondition) {
      setShouldDisplayModal(true);
    } else {
      setStatesToDefaultOn('all');
    }
  };

  const handleSwitch = handleSwitchFor({
    drugInputCondition: isDrugInputFilled,
    shouldRenderState: shouldRender,
    treatmentsToRenderCondition: thereAreTreatmentToRender,
  });

  const handleAcceptButton = () => {
    setFormState((prevState) => ({
      ...prevState,
      ['treatments']: {
        shouldDisplay: false,
      },
    }));
    setShouldDisplayModal(false);
    setStatesToDefaultOn('all');
  };

  const handleCancelButton = () => {
    setShouldDisplayModal(false);
  };

  const handleRadioOnChange = (value) => setRadioButtonValue(value);

  const handleOnChangeFor = (setState) => (value) => setState(value);

  const resetObservationAndStartingDateError = () =>
    setFormErrors((prevState) => ({
      ...prevState,
      isStartingDateInputOnError: false,
      isObservationsInputOnError: false,
    }));

  const handleDrugValueDebounced = useDebouncedCallback(handleOnChangeFor(setDrugValue), 250, {
    trailing: true,
  });

  const handleObservationsDebounced = useDebouncedCallback(
    (value) => {
      resetObservationAndStartingDateError();
      handleOnChangeFor(setObservations)(value);
    },
    250,
    {
      trailing: true,
    }
  );

  const handleStartingTreatmentDateValueDebounced = useDebouncedCallback(
    (value) => {
      resetObservationAndStartingDateError();
      handleOnChangeFor(setStartingTreatmentDateValue)(value);
    },
    250,
    {
      trailing: true,
    }
  );

  const handleEndingTreatmentDateValueDebounced = useDebouncedCallback(
    handleOnChangeFor(setEndingTreatmentDateValue),
    250,
    {
      trailing: true,
    }
  );

  const handleAddTreatmentFor = ({
    drugInputCondition,
    errorRefCondition,
    observationsValue,
    startingDateCondition,
    startingDateValue,
    shouldHaveEndingDateValue,
    endingDateCondition,
    endingDateValue,
  }) => () => {
    const isDrugValueValidated = drugInputCondition && !errorRefCondition.current;
    const atLeastOneRequiredFieldIsFilled = observationsValue !== '' || startingDateCondition;
    const isEndingDateValidated = shouldHaveEndingDateValue
      ? endingDateCondition &&
        startingDateCondition &&
        !isBefore(
          endingDateValue,
          new Date(
            startingDateValue.getFullYear(),
            startingDateValue.getMonth(),
            startingDateValue.getDate()
          )
        )
      : true;

    if (isDrugValueValidated && atLeastOneRequiredFieldIsFilled && isEndingDateValidated) {
      setTreatments((prevState) => createTreatmentsObj(prevState));
      setFormState((prevState) => addNewObjInGlobalState(prevState));
      setStatesToDefaultOn('inputs');
    } else {
      setError();
    }
  };
  const handleAddTreatment = handleAddTreatmentFor({
    drugInputCondition: isDrugInputFilled,
    errorRefCondition: isEndingDateInputValueValidated,
    observationsValue: observations,
    startingDateCondition: isStartingDateValidated,
    startingDateValue: startingTreatmentDateValue,
    shouldHaveEndingDateValue: shouldHaveEndingDate,
    endingDateCondition: isEndingDateInputValueValidated,
    endingDateValue: endingTreatmentDateValue,
  });

  const setStateObjTreatment = useMemo(
    () => ({
      setFormStatePS: setFormState,
      setTreatmentsParent: setTreatments,
    }),
    [setFormState]
  );

  const updateIsUnresolvedRefOn = useCallback((drugInputCondition, refValue) => {
    if (drugInputCondition) {
      refValue.current = true;
    } else {
      refValue.current = false;
    }
  }, []);

  const manageIsUnresolvedOnProp = useCallback((isUnresolvedProp) => {
    if (isUnresolvedProp) {
      setIsUnresolved(true);
    } else {
      setIsUnresolved(false);
    }
  }, []);

  useEffect(() => {
    updateIsUnresolvedRefOn(isDrugInputFilled, ref);
  }, [isDrugInputFilled, ref, updateIsUnresolvedRefOn]);

  useEffect(() => manageIsUnresolvedOnProp(isUnresolvedError), [
    isUnresolvedError,
    manageIsUnresolvedOnProp,
  ]);

  useEffect(() => {
    if (shouldReset) {
      setShouldReset(false);
    }
  }, [shouldReset]);

  useEffect(() => {
    if (shouldDisplay) {
      setShouldRender(shouldDisplay);
    }
  }, [shouldDisplay]);

  useEffect(() => {
    if (shouldRender) {
      setTreatments(getItems(formValues));
      setFormState((prevState) => ({
        ...prevState,
        ['treatments']: {
          shouldDisplay: true,
          ...getItems(formValues),
        },
      }));
    }
  }, [shouldRender, setFormState, formValues]);

  return [
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
  ];
};

export default useForm;
