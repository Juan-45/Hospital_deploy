import { PreSurgical } from 'context/PreSurgical';
import createArrFromObject from 'helpers/createArrFromObj';
import getItems from 'helpers/getItems';
import { useContext } from 'react';
import { useMemo, useCallback, useEffect, useState } from 'react';

const useForm = (ref, isUnresolvedError) => {
  const studiesFromServer = {
    ['hemoglobin']: {
      name: 'hemoglobin',
      label: 'Hemoglobina',
      type: 'numerical',
      unit: 'g/dl',
      description:
        'El rango normal de hemoglobina se define generalmente como 13,2 a 16,6 gramos (g) de hemoglobina por decilitro (dL) de sangre para los hombres y 11,6 a 15 g/dL para las mujeres.',
    },
    ['electrocardiogram']: {
      name: 'electrocardiogram',
      label: 'Electrocardiográma',
      type: 'textual',
      description:
        'Unos resultados normales incluirían una frecuencia cardíaca de entre 60 y 100 latidos por minuto, y un ritmo cardíaco constante y uniforme.',
    },
    ['chestXRay']: {
      name: 'chestXRay',
      label: 'Radiografía de Torax',
      type: 'image',
      description:
        'Las radiografías de tórax permiten detectar cáncer, infección o acumulación de aire en el espacio alrededor de un pulmón, lo que puede provocar su colapso. También muestran enfermedades pulmonares crónicas, como enfisema o fibrosis quística, así como complicaciones relacionadas con estas enfermedades.',
    },
    ['hematocrit']: {
      name: 'hematocrit',
      label: 'Hematocrito',
      type: 'numerical',
      unit: '%',
      description:
        'El rango normal de hematocritos se define generalmente como desde 40,7% al 50,3% para los hombres y desde 36,1% al 44,3% para las mujeres.',
    },
    ['prothrombinTime']: {
      name: 'prothrombinTime',
      label: 'Tp',
      type: 'numerical',
      unit: 'seg',
      description:
        'El TP se mide en segundos. La mayoría de las veces, los resultados se dan como lo que se llama IIN (índice internacional normalizado). Si el paciente no está tomando anticoagulantes, como warfarina, el rango normal para los resultados de TP es: 11 a 13.5 segundos.',
    },
    ['kAPT']: {
      name: 'kAPT',
      label: 'Kptt',
      type: 'numerical',
      unit: 'seg',
      description: 'Los valores normales de Kptt se definen entre los 35 a los 50 seg.',
    },
  };

  const defaultModalState = useMemo(
    () => ({
      show: false,
      closeCurrentForm: false,
      closeRootForm: false,
      text: '',
    }),
    []
  );

  const { initialState, updateGlobalState } = useContext(PreSurgical);
  const { studiesDone } = initialState;

  const { shouldDisplay, ...completedStudiesProps } = studiesDone;

  const [completedStudies, setCompletedStudies] = useState(completedStudiesProps);
  const [shouldRender, setShouldRender] = useState(shouldDisplay);
  //Available studies, state initialized with data from the server
  const [availableStudies, setAvailableStudies] = useState(studiesFromServer);
  const [studiesCheckboxes, setStudiesCheckboxes] = useState();
  const [currentCheckboxStudyName, setCurrentCheckboxStudyName] = useState();
  const [studiesFormProps, setStudiesFormProps] = useState();
  const [storageOfStudyFormValues, setStorageOfStudyFormValues] = useState({});
  const [modalState, setModalState] = useState(defaultModalState);
  const [studyCount, setStudyCount] = useState(0);
  const [page, setPage] = useState(1);
  const [isUnresolved, setIsUnresolved] = useState(false);

  const resetForGlobalState = useCallback(() => {
    updateGlobalState((prevState) => ({
      ...prevState,
      studiesDone: {
        shouldDisplay: false,
      },
    }));
  }, [updateGlobalState]);

  const updateStateWithFunction = useCallback(
    (func) => {
      updateGlobalState((prevState) => ({
        ...prevState,
        studiesDone: {
          ...func(prevState['studiesDone']),
        },
      }));
    },
    [updateGlobalState]
  );

  const getDefaultCheckboxesStateFrom = useCallback((obj) => {
    const stateObj = {};
    for (let key in obj) {
      stateObj[key] = false;
    }
    return stateObj;
  }, []);

  const resetFormStates = () => {
    resetForGlobalState();
    setCompletedStudies({});
    setStudiesFormProps({});
    setStorageOfStudyFormValues({});
    setStudyCount(0);
    setPage(1);
    setShouldRender((prevState) => !prevState);
  };

  const deleteExistingKeyFromState = (currentState, name) => {
    const stateObj = { ...currentState };
    delete stateObj[name];
    return stateObj;
  };

  const setStatesOnUnchecking = (currentName) => {
    setStudiesCheckboxes((prevState) => ({
      ...prevState,
      [currentName]: false,
    }));
    setStudiesFormProps((prevState) => deleteExistingKeyFromState(prevState, currentName));
    setStorageOfStudyFormValues((prevState) => deleteExistingKeyFromState(prevState, currentName));
    setStudyCount((prevState) => prevState - 1);
    setPage(1);
  };

  const handleSwitchFor = ({ stateOfStudiesStoraged, studiesDoneState, renderCondition }) => () => {
    const checkValuesEqualityIn = (obj) => {
      for (let key in obj) {
        const currentStudy = obj[key];
        if (currentStudy['result'] !== '' || currentStudy['observations'] !== '') {
          return true;
        }
      }
      return false;
    };
    const atLeastOneFieldIsNotEmpty = checkValuesEqualityIn(stateOfStudiesStoraged);
    const shouldDisplayModal =
      renderCondition === true &&
      (atLeastOneFieldIsNotEmpty || Object.keys(studiesDoneState).length > 1);
    if (shouldDisplayModal) {
      const modalTextForClosing =
        'Todo estudio previamente completado al igual que todos los datos ingresados en formularios de estudios se perderán y no podran recuperarse, ¿está seguro que desea continuar?.';
      setModalState((prevState) => ({
        ...prevState,
        show: true,
        closeRootForm: true,
        text: modalTextForClosing,
      }));
    } else {
      resetFormStates();
    }
  };

  const handleSwitch = handleSwitchFor({
    stateOfStudiesStoraged: storageOfStudyFormValues,
    studiesDoneState: completedStudies,
    renderCondition: shouldRender,
  });

  const handleAcceptButtonFor = ({ modalStateObj, currentName }) => () => {
    const { closeRootForm, closeCurrentForm } = modalStateObj;
    if (closeRootForm === true) {
      resetFormStates();
      setModalState(defaultModalState);
    } else if (closeCurrentForm === true) {
      setStatesOnUnchecking(currentName);
      setModalState(defaultModalState);
    }
  };

  const handleAcceptButton = handleAcceptButtonFor({
    modalStateObj: modalState,
    currentName: currentCheckboxStudyName,
  });

  const handleCancelButton = () => setModalState(defaultModalState);

  const handleCheckboxesFor = ({ availableStudiesState, stateOfStudiesStoraged }) => (event) => {
    const checkValuesEqualityInCurrentStudy = (storedValues) => {
      if (storedValues) {
        const { result, observations } = storedValues;
        const areNotEmpty = result !== '' || observations !== '';
        return areNotEmpty;
      }
    };

    const shouldCloseForm = event.target.checked === false;
    const currentStudyName = event.target.name;
    const { label, type, description, unit } = availableStudiesState[currentStudyName];
    const currentStoredStudyValues = stateOfStudiesStoraged[currentStudyName];
    const atLeastOneFieldIsNotEmpty = checkValuesEqualityInCurrentStudy(currentStoredStudyValues);

    setCurrentCheckboxStudyName(currentStudyName);

    const getModalUpdatedStateFor = (studyLabel) => (prevState) => {
      const modalTextForClosingCurrentStudy = `Todos los datos cargados para "${studyLabel}" se perderán, ¿está seguro que desea continuar?.`;
      return {
        ...prevState,
        show: true,
        closeCurrentForm: true,
        text: modalTextForClosingCurrentStudy,
      };
    };

    const getCheckboxesUpdatedStateFor = (currentStudy) => (prevState) => ({
      ...prevState,
      [currentStudy]: event.target.checked,
    });

    const addNewStudyPropsFor = ({
      studyLabel,
      currentStudy,
      studyType,
      studyDescription,
      measurementUnit,
    }) => (prevState) => {
      const newStudyFormProps = {
        name: currentStudy,
        title: studyLabel,
        type: studyType,
        description: studyDescription,
      };
      if (studyType === 'numerical') {
        Object.assign(newStudyFormProps, { unit: measurementUnit });
      }
      const stateObj = {
        ...prevState,
        [currentStudy]: newStudyFormProps,
      };
      return stateObj;
    };

    const addNewStudyFormValues = (currentStudy) => (prevState) => {
      const newStudyFormValues = {
        result: '',
        resultDate: new Date(),
        observations: '',
      };
      if (type === 'image') {
        Object.assign(newStudyFormValues, { imageFiles: '' });
      }
      const stateObj = {
        ...prevState,
        [currentStudy]: newStudyFormValues,
      };
      return stateObj;
    };
    if (shouldCloseForm) {
      if (atLeastOneFieldIsNotEmpty) {
        setModalState((prevState) => getModalUpdatedStateFor(label)(prevState));
      } else setStatesOnUnchecking(currentStudyName);
    } else {
      setStudiesCheckboxes((prevState) =>
        getCheckboxesUpdatedStateFor(currentStudyName)(prevState)
      );
      setStudiesFormProps((prevState) =>
        addNewStudyPropsFor({
          studyLabel: label,
          currentStudy: currentStudyName,
          studyType: type,
          studyDescription: description,
          measurementUnit: unit,
        })(prevState)
      );
      setStorageOfStudyFormValues((prevState) =>
        addNewStudyFormValues(currentStudyName)(prevState)
      );
      setStudyCount((prevState) => prevState + 1);
    }
  };

  const handleCheckboxes = handleCheckboxesFor({
    availableStudiesState: availableStudies,
    studyProps: studiesFormProps,
    stateOfStudiesStoraged: storageOfStudyFormValues,
  });

  const handlePaginationOnChange = (event, value) => {
    setPage(value);
  };

  const getStudiesCheckboxesArr = (obj) => {
    const arr = [];
    for (let key in obj) {
      const currentItem = obj[key];
      arr.push({
        name: currentItem.name,
        label: currentItem.label,
      });
    }
    return arr;
  };

  const setStateObjStudyForm = useMemo(
    () => ({
      updateGlobalState: updateStateWithFunction,
      setAvailableStudiesParent: setAvailableStudies,
      setStudiesCheckboxesStateParent: setStudiesCheckboxes,
      setStudiesFormPropsParent: setStudiesFormProps,
      setStudyCountParent: setStudyCount,
      setPageParent: setPage,
      setStudiesFormValuesStorageParent: setStorageOfStudyFormValues,
      setCompletedStudiesParent: setCompletedStudies,
    }),
    [updateStateWithFunction]
  );

  const setStateObjNewStudy = useMemo(
    () => ({
      setAvailableStudiesParent: setAvailableStudies,
      setStudiesCheckboxesStateParent: setStudiesCheckboxes,
    }),
    []
  );

  const setStateObjCompletedStudy = useMemo(
    () => ({
      updateGlobalState: updateStateWithFunction,
      setCompletedStudiesParent: setCompletedStudies,
    }),
    [updateStateWithFunction]
  );

  const completedStudiesPropsArr = useMemo(() => createArrFromObject(completedStudies), [
    completedStudies,
  ]);

  const studiesCheckboxesArr = getStudiesCheckboxesArr(availableStudies);

  const updateRefOnStudiesToRender = useCallback(({ count, refValue }) => {
    const thereIsStudiesToRender = count !== 0;
    if (thereIsStudiesToRender) {
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
    updateRefOnStudiesToRender({ count: studyCount, refValue: ref });
  }, [studyCount, ref, updateRefOnStudiesToRender]);

  useEffect(() => {
    manageIsUnresolvedOnProp(isUnresolvedError);
  }, [isUnresolvedError, manageIsUnresolvedOnProp]);

  useEffect(() => {
    if (availableStudies) {
      setStudiesCheckboxes(getDefaultCheckboxesStateFrom(availableStudies));
    }
  }, [availableStudies, getDefaultCheckboxesStateFrom, setStudiesCheckboxes]);

  useEffect(() => {
    if (shouldDisplay) {
      setShouldRender(shouldDisplay);
    }
  }, [shouldDisplay]);

  useEffect(() => {
    if (shouldRender) {
      setStudiesCheckboxes(getDefaultCheckboxesStateFrom(availableStudies));
      setCompletedStudies(getItems(studiesDone));
      updateGlobalState((prevState) => ({
        ...prevState,
        ['studiesDone']: {
          shouldDisplay: true,
          ...getItems(studiesDone),
        },
      }));
    }
  }, [
    shouldRender,
    updateGlobalState,
    availableStudies,
    getDefaultCheckboxesStateFrom,
    setCompletedStudies,
    studiesDone,
  ]);

  return [
    {
      studiesCheckboxes,
      studiesCheckboxesArr,
      storageOfStudyFormValues,
      studiesFormProps,
      page,
      isUnresolved,
      shouldRender,
      modalState,
      studyCount,
      completedStudiesPropsArr,
    },
    {
      handleSwitch,
      handleAcceptButton,
      handleCancelButton,
      handleCheckboxes,
      handlePaginationOnChange,
      createArrFromObject,
      setStateObjStudyForm,
      setStateObjNewStudy,
      setStateObjCompletedStudy,
    },
  ];
};

export default useForm;
