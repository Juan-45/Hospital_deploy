import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useForm = (formProps, setStateObj, currentFormValuesStorage) => {
  const defaultInputErrors = {
    resultRequired: false,
    resultDateRequired: false,
  };
  const defaultModalState = {
    show: false,
    delete: false,
    close: false,
    text: '',
  };

  const { name, title, type } = formProps;
  formProps['unit'];

  const getUnitValue = (obj) => {
    const typeValue = obj.type;
    if (typeValue === 'numerical') {
      return obj.unit;
    }
  };

  const unitValue = getUnitValue(formProps);

  const {
    updateGlobalState,
    setAvailableStudiesParent,
    setStudiesCheckboxesStateParent,
    setStudiesFormPropsParent,
    setStudyCountParent,
    setPageParent,
    setStudiesFormValuesStorageParent,
    setCompletedStudiesParent,
  } = setStateObj;
  const {
    result: resultValueStoraged,
    resultDate: resultDateValueStoraged,
    observations: observationsValueStoraged,
    imageFiles: imageFilesValueStoraged,
  } = currentFormValuesStorage;

  const [modalState, setModalState] = useState(defaultModalState);
  const [result, setResult] = useState(resultValueStoraged);
  const [resultDate, setResultDate] = useState(
    resultDateValueStoraged == 'Invalid Date' ? null : resultDateValueStoraged
  );
  const [observations, setObservations] = useState(observationsValueStoraged);
  const [imageFiles, setImageFiles] = useState(imageFilesValueStoraged);
  const [formErrors, setFormErrors] = useState(defaultInputErrors);
  let isResultInputInErrorRef = useRef();
  let isImageFilesInputInErrorRef = useRef();

  const resultDateIsAfter = isAfter(resultDate, new Date('2040', '01', '01'));

  const resultDateIsBefore = isBefore(resultDate, new Date('1900', '01', '01'));
  const isResultDateValidated =
    !resultDateIsAfter &&
    !resultDateIsBefore &&
    resultDate !== null &&
    resultDate != 'Invalid Date';

  const handleOnChangeFor = (setState) => (value) => setState(value);

  const handleResultDebounced = useDebouncedCallback(handleOnChangeFor(setResult), 250, {
    trailing: true,
  });

  const handleResultDateDebounced = useDebouncedCallback(handleOnChangeFor(setResultDate), 250, {
    trailing: true,
  });

  const handleObservationDebounced = useDebouncedCallback(handleOnChangeFor(setObservations), 250, {
    trailing: true,
  });

  const resetStatesForUnchecking = (key) => {
    setStudiesCheckboxesStateParent((prevState) => ({
      ...prevState,
      [key]: false,
    }));
    setModalState(defaultModalState);
  };

  const deleteExistingKeyFromState = (prevState) => {
    const stateObj = { ...prevState };
    delete stateObj[name];
    return stateObj;
  };

  const removeStudyToRender = (key) => {
    setStudiesFormValuesStorageParent((prevState) => deleteExistingKeyFromState(prevState, key));
    setStudiesFormPropsParent((prevState) => deleteExistingKeyFromState(prevState, key));
    setStudyCountParent((prevState) => prevState - 1);
    setPageParent(1);
  };

  const setStateForClosingStudyForm = (key) => {
    resetStatesForUnchecking(key);
    removeStudyToRender(key);
  };

  const setFormError = (formValues) => {
    const { resultValue, resultDateCondition } = formValues;

    const setFormErrorFor = (key) =>
      setFormErrors({
        ...defaultInputErrors,
        [`${key}Required`]: true,
      });

    if (resultValue === '' || resultValue == 0) {
      setFormErrorFor('result');
    } else if (!resultDateCondition) {
      setFormErrorFor('resultDate');
    }
  };

  const formattedDate = isResultDateValidated
    ? `${resultDate.getDate()}/${resultDate.getMonth() + 1}/${resultDate.getFullYear()}`
    : null;

  const addNewObjInState = (prevState, formValues) => {
    let fileNamesArr = [];

    const {
      key,
      labelValue,
      resultValue,
      observationsValue,
      date,
      unit,
      typeValue,
      imageFilesObj,
    } = formValues;

    const stateObj = {
      ...prevState,
      shouldDisplay: true,
      [key]: {
        ['name']: key,
        label: labelValue,
        result: resultValue,
        observations: observationsValue,
        date,
      },
    };

    const getFilesNames = (obj) => {
      const fileNames = [];
      for (let currentKey in obj) {
        const isAFileKey = Number.isInteger(Number(currentKey));
        if (isAFileKey) {
          fileNames.push(obj[currentKey]['name']);
        }
      }
      return fileNames;
    };
    if (imageFilesObj !== '') {
      fileNamesArr = getFilesNames(imageFilesObj);
    }
    if (typeValue === 'numerical') {
      Object.assign(stateObj[key], {
        unit,
      });
    } else if (typeValue === 'image') {
      Object.assign(stateObj[key], {
        imageFiles: fileNamesArr,
      });
    }
    return stateObj;
  };

  const handleOnCloseFor = (formValues) => () => {
    const { key, labelValue, resultValue, observationsValue } = formValues;
    const modalTextForClosing = `Todos los datos cargados para "${labelValue}" se perderán, ¿está seguro que desea continuar?.`;
    const isFormWithValues = resultValue !== '' || observationsValue !== '';
    if (isFormWithValues) {
      setModalState((prevState) => ({
        ...prevState,
        show: true,
        close: true,
        text: modalTextForClosing,
      }));
    } else {
      setStateForClosingStudyForm(key);
    }
  };

  const handleOnClose = handleOnCloseFor({
    labelValue: title,
    observationsValue: observations,
    key: name,
    resultValue: result,
  });

  const handleDeleteWith = (label) => () => {
    const modalTextForDeleting = `Está a punto de eliminar permanentemente el estudio "${label}" de la aplicación, ¿Está seguro que desea continuar?`;
    setModalState((prevState) => ({
      ...prevState,
      show: true,
      delete: true,
      text: modalTextForDeleting,
    }));
  };

  const handleDelete = handleDeleteWith(title);

  const handleAcceptButtonFor = (modalStateObj, currentKey) => () => {
    const shouldDeleteStudy = modalStateObj['delete'] === true;
    const shouldCloseForm = modalStateObj['close'] === true;

    if (shouldDeleteStudy) {
      setAvailableStudiesParent((prevState) => deleteExistingKeyFromState(prevState, currentKey));
      setStudiesCheckboxesStateParent((prevState) =>
        deleteExistingKeyFromState(prevState, currentKey)
      );
      setModalState(defaultModalState);
    } else if (shouldCloseForm) {
      resetStatesForUnchecking(currentKey);
    }
    removeStudyToRender(currentKey);
  };

  const handleAcceptButton = handleAcceptButtonFor(modalState, name);

  const handleCancelButton = () => setModalState(defaultModalState);

  const handleOnAddFor = (formValues) => () => {
    const { key } = formValues;

    const getValidationForAStudyWithFileInput = (formVal) => {
      const { resultValue, resultDateCondition, filesInputErrorRef, resultInputErrorRef } = formVal;
      const condition =
        resultValue !== '' &&
        !resultInputErrorRef.current &&
        resultDateCondition &&
        !filesInputErrorRef.current;
      return condition;
    };

    const getValidationForStudyForm = (formVal) => {
      const { resultValue, resultDateCondition, resultInputErrorRef } = formVal;
      const condition = resultValue !== '' && !resultInputErrorRef.current && resultDateCondition;
      return condition;
    };

    const checkIfCurrentStudyHasFileInput = (formVal) => {
      const { filesInputErrorRef } = formVal;
      const condition = typeof filesInputErrorRef.current === 'boolean';
      return condition;
    };

    const hasCurrentStudyAFileInput = checkIfCurrentStudyHasFileInput(formValues);
    let shouldAddCompletedStudy;
    if (hasCurrentStudyAFileInput) {
      shouldAddCompletedStudy = getValidationForAStudyWithFileInput(formValues);
    } else {
      shouldAddCompletedStudy = getValidationForStudyForm(formValues);
    }

    if (shouldAddCompletedStudy) {
      updateGlobalState((prevState) => addNewObjInState(prevState, formValues));
      setCompletedStudiesParent((prevState) => addNewObjInState(prevState, formValues));
      setStudiesCheckboxesStateParent((prevState) => ({
        ...prevState,
        [key]: false,
      }));
      removeStudyToRender(key);
    } else setFormError(formValues);
  };

  const handleOnAdd = handleOnAddFor({
    labelValue: title,
    observationsValue: observations,
    date: formattedDate,
    unit: unitValue,
    typeValue: type,
    key: name,
    imageFilesObj: imageFiles,
    resultValue: result,
    resultDateCondition: isResultDateValidated,
    filesInputErrorRef: isImageFilesInputInErrorRef,
    resultInputErrorRef: isResultInputInErrorRef,
  });

  const getStoredStudiesUpdatedStateFor = useCallback(
    ({ resultValue, resultDateValue, observationsValue, key, imageFilesArr, studyType }) => (
      prevState
    ) => {
      const newState = {
        ...prevState,
        [key]: {
          result: resultValue,
          resultDate: resultDateValue,
          observations: observationsValue,
        },
      };
      if (studyType === 'image') {
        Object.assign(newState[key], { imageFiles: imageFilesArr });
      }
      return newState;
    },
    []
  );

  const getStoredStudiesUpdatedState = useCallback(() => {
    const objArgument = {
      resultValue: result,
      resultDateValue: resultDate,
      observationsValue: observations,
      key: name,
      imageFilesArr: imageFiles,
      studyType: type,
    };
    return getStoredStudiesUpdatedStateFor(objArgument);
  }, [getStoredStudiesUpdatedStateFor, result, resultDate, name, imageFiles, type, observations]);

  useEffect(() => {
    setStudiesFormValuesStorageParent((prevState) => getStoredStudiesUpdatedState()(prevState));
  }, [setStudiesFormValuesStorageParent, getStoredStudiesUpdatedState]);

  return [
    formErrors,
    result,
    modalState,
    imageFiles,
    resultDate,
    observations,
    isResultInputInErrorRef,
    isImageFilesInputInErrorRef,
    {
      setImageFiles,
      handleResultDebounced,
      handleResultDateDebounced,
      handleObservationDebounced,
      handleOnClose,
      handleDelete,
      handleAcceptButton,
      handleCancelButton,
      handleOnAdd,
    },
  ];
};

export default useForm;
