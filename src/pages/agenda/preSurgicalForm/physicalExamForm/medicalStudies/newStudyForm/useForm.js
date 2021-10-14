import { useState, useEffect, useRef, useMemo } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useForm = (setStateObj) => {
  const defaultState = useMemo(
    () => ({
      studyName: '',
      studyType: '',
      measurementUnit: '',
      studyDescription: '',
    }),
    []
  );

  const [formState, setFormState] = useState(defaultState);

  const formErrorsDefaultValues = {
    studyNameRequired: false,
    studyTypeRequired: false,
    measurementUnitRequired: false,
  };

  const { setAvailableStudiesParent, setStudiesCheckboxesStateParent } = setStateObj;
  const { studyName, studyType, studyDescription, measurementUnit } = formState;

  const [shouldReset, setShouldReset] = useState(false);
  const [formErrors, setFormErrors] = useState(formErrorsDefaultValues);

  let isStudyNameInputInError = useRef();
  let isMeasurementUnitInputInError = useRef();

  const resetForm = () => {
    setShouldReset(true);
    setFormErrors(formErrorsDefaultValues);
    setFormState(defaultState);
  };

  const setFormError = (formValues) => {
    const { key, type, unit } = formValues;
    const setFormErrorFor = (keyValue) =>
      setFormErrors((prevState) => ({
        ...prevState,
        [`${keyValue}Required`]: true,
      }));
    if (key === '') {
      setFormErrorFor('studyName');
    }
    if (type === '') {
      setFormErrorFor('studyType');
    }
    if (type === 'numerical' && unit === '') {
      setFormErrorFor('measurementUnit');
    }
  };

  const handleOnChangeFor = (name) => (value) =>
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  const handleStudyNameDebounced = useDebouncedCallback(handleOnChangeFor('studyName'), 250, {
    trailing: true,
  });

  const handleMeasurementUnitDebounced = useDebouncedCallback(
    handleOnChangeFor('measurementUnit'),
    250,
    {
      trailing: true,
    }
  );
  const handleStudyDescriptionDebounced = useDebouncedCallback(
    handleOnChangeFor('studyDescription'),
    250,
    {
      trailing: true,
    }
  );

  const handleStudyType = handleOnChangeFor('studyType');

  const isFormValid =
    studyName !== '' &&
    !isStudyNameInputInError.current &&
    studyType !== '' &&
    (studyType === 'numerical'
      ? measurementUnit !== '' && !isMeasurementUnitInputInError.current
      : true);

  const handleOnAddWith = (condition, formValues) => () => {
    const { key, type, unit, description } = formValues;

    if (condition) {
      setAvailableStudiesParent((prevState) => ({
        ...prevState,
        [key]: {
          name: key,
          label: key,
          type,
          unit,
          description,
        },
      }));
      setStudiesCheckboxesStateParent((prevState) => ({
        ...prevState,
        [key]: false,
      }));
      resetForm();
    } else setFormError(formValues);
  };

  const handleOnAdd = handleOnAddWith(isFormValid, {
    key: studyName,
    type: studyType,
    unit: measurementUnit,
    description: studyDescription,
  });

  useEffect(() => {
    if (shouldReset) {
      setShouldReset(false);
    }
  }, [shouldReset]);

  return [
    {
      formErrors,
      shouldReset,
      isStudyNameInputInError,
      isMeasurementUnitInputInError,
      studyType,
    },
    {
      handleStudyNameDebounced,
      handleMeasurementUnitDebounced,
      handleStudyDescriptionDebounced,
      handleOnAdd,
      handleStudyType,
    },
  ];
};

export default useForm;
