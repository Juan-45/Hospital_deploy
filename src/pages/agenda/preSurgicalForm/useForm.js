import { useState, useMemo, useRef, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import useStyles from './useStyles';

const useForm = () => {
  const preSurgicalDefaultState = {
    currentPatient: {
      lastName: 'Gonzáles',
      firstName: 'Joaquín',
      iDNumber: '32.589.451',
      gender: 'male',
      age: '34',
    },
    headingSection: {
      preSurgicalDiagnostic: '',
      proposedSurgeon: '',
    },
    preSurgicalClinical: {
      cardiovascular: {
        shouldDisplay: false,
        observations: '',
        checkboxHypertension: false,
        checkboxArrhythmias: false,
        checkboxStableAnginaCF: false,
        checkboxUnstableAngina: false,
        checkboxAMIDate: false,
        checkboxValvularHeartDisease: false,
        checkboxDyspnoeaCF: false,
        checkboxheartSurgeryDate: false,
        checkboxPacemaker: false,
        checkboxEdema: false,
        checkboxVaricoseVeins: false,
      },
      respiratory: {
        shouldDisplay: false,
        observations: '',
        checkboxAsthma: false,
        checkboxCOPD: false,
        checkboxSmoking: false,
        checkboxCough: false,
        checkboxExpectoration: false,
        checkboxDyspnoeaCF: false,
      },
      ocular: {
        shouldDisplay: false,
        observations: '',
        checkboxGlaucoma: false,
        checkboxWearingContactLenses: false,
      },
      gastrointestinal: {
        shouldDisplay: false,
        observations: '',
        checkboxAcidSensitiveSyndrome: false,
        checkboxHiatalHerniaReflux: false,
        checkboxOcclusion: false,
        checkboxLiverFailure: false,
        checkboxHepatitis: false,
        checkboxCirrhosis: false,
        checkboxJaundiceCholectosis: false,
      },
      urinary: {
        shouldDisplay: false,
        observations: '',
        checkboxChronicKidneyFailure: false,
        checkboxAcuteRenalFailure: false,
        checkboxDialysis: false,
        checkboxIncontinence: false,
        checkboxDysuriaPolish: false,
      },
      allergies: {
        shouldDisplay: false,
        observations: '',
        checkboxMedicines: false,
      },
      endocrineMetabolic: {
        shouldDisplay: false,
        observations: '',
        checkboxObesity: false,
        checkboxDiabetes: false,
        checkboxHyperthyroidism: false,
        checkboxHypothyroidism: false,
        checkboxAdrenals: false,
        checkboxMalnutrition: false,
        checkboxDehydration: false,
        checkboxHyperthermia: false,
        checkboxAlcoholism: false,
      },
      neuromuscular: {
        shouldDisplay: false,
        observations: '',
        checkboxCVA: false,
        checkboxTIA: false,
        checkboxParesis: false,
        checkboxParaesthesia: false,
        checkboxAphasias: false,
        checkboxSeizures: false,
        checkboxIntracranialHypertension: false,
        checkboxMyopathies: false,
      },
      hematological: {
        shouldDisplay: false,
        observations: '',
        checkboxAnemia: false,
        checkboxCoagulopathies: false,
        checkboxTransfusions: false,
        checkboxJehovahsWitness: false,
      },
      connectiveTissueDiseases: {
        shouldDisplay: false,
        observations: '',
        checkboxSEL: false,
        checkboxRA: false,
        checkboxAntiphospholipidSyndrome: false,
      },
      obstetricGynecologicalHistory: {
        shouldDisplay: false,
        observations: '',
        checkboxLMP: false,
        checkboxPregnancies: false,
        checkboxAbortions: false,
        checkboxEclampsia: false,
        checkboxPreeclampsiaOC: false,
      },
      psychiatric: {
        shouldDisplay: false,
        observations: '',
      },
      anestheticHistory: {
        shouldDisplay: false,
        observations: '',
      },
      others: {
        shouldDisplay: false,
        observations: '',
      },
    },

    treatments: {
      shouldDisplay: false,
    },

    physicalExams: {
      cardiacAuscultation: '',
      pulmonaryAuscultation: '',
      spine: '',
      diastolicPressure: '',
      systolicPressure: '',
      pulse: '',
      asaLevel: 1,
      painLevel: 0,
      weight: '',
      height: '',
      vTFactor: 2,
      observations: '',
      bMIndex: '',
      bMI: '',
      bMIC: '',
      tV: '',
      bloodType: '',
      factorRh: '',
    },

    airwayExams: {
      mouthOpening: '',
      malampati: '',
      thyromentalDistance: '',
      goniomentalDistance: '',
      neckMovement: '',
      teeth: '',
      difficultAirwayForetell: '',
      observations: '',
    },

    studiesDone: {
      shouldDisplay: false,
    },

    bottomSection: {
      psychicState: '',
      psychicStateObservation: '',
      anestheticPlan: '',
      anestheticPlanObservation: '',
      bloodSampleRequest: '',
      iCURequest: '',
      interconsultations: '',
      extraObservations: '',
    },
  };

  //Necessary to the validationMessagesArr
  const classes = useStyles();
  //Initial Global State
  const [initialFormState /*, setInitialFormState*/] = useState(preSurgicalDefaultState);

  //Form Values Global State
  const [formGlobalState, setFormGlobalState] = useState(preSurgicalDefaultState);

  const contextObject = useMemo(
    () => ({
      initialState: initialFormState,
      updateGlobalState: setFormGlobalState,
    }),
    [initialFormState]
  );

  const [dateState, setDateState] = useState(new Date());

  const [isPreviewClicked, setIsPreviewClicked] = useState(false);

  const [isRequiredErrorHeaderSection, setIsRequiredErrorHeaderSection] = useState({
    preSurgicalDiagnosticIsRequired: false,
    proposedSurgeonIsRequired: false,
  });
  const [isRequiredErrorFirstSection, setIsRequiredErrorFirstSection] = useState({
    weightIsRequired: false,
    heightIsRequired: false,
  });
  const [isRequiredAirwaySection, setIsRequiredAirwaySection] = useState({
    mouthOpeningIsRequired: false,
    malampatiIsRequired: false,
    thyromentalDistanceIsRequired: false,
    goniomentalDistanceIsRequired: false,
    neckMovementIsRequired: false,
    teethIsRequired: false,
    difficultAirwayForetellIsRequired: false,
  });
  const [isRequiredBottomSection, setIsRequiredBottomSection] = useState({
    anestheticPlanIsRequired: false,
  });

  const [isRequiredDateAndTime, setIsRequiredDateAndTime] = useState(false);

  const [isTreatmentsUnresolved, setIsTreatmentsUnresolved] = useState();
  const [isFirstSectionUnresolved, setIsFirstSectionUnresolved] = useState();
  const [isMedicalStudiesUnresolved, setIsMedicalStudiesUnresolved] = useState();

  const [medicalStudiesRequired, setMedicalStudiesRequired] = useState({});

  const [isRequiredErrorSetted, setIsRequiredErrorSetted] = useState(false);
  const [isInputOnErrorSetted, setIsInputOnErrorSetted] = useState(false);
  const [isInnerFormUnresolvedSetted, setIsInnerFormUnresolvedSetted] = useState(false);
  const [areMedicalStudiesRequiredErrorSetted, setIsMedicalStudiesRequiredErrorSetted] = useState(
    false
  );
  const [areBothFieldsRequiredBloodPresure, setAreBothFieldsRequiredBloodPresure] = useState(false);
  const [areBothFieldsRequiredBloodType, setAreBothFieldsRequiredBloodType] = useState(false);

  const [isValidated, setIsValidated] = useState(false);

  const [formDataWasSended, setFormDataWasSended] = useState(false); //set this after reciving succesed response from the server
  const [formDataWasSendedAsCompleted, setFormDataWasSendedAsCompleted] = useState(false);

  //Validated form values
  const [preSurgicalFormPDFData, setPreSurgicalFormPDFData] = useState({});

  let countOfRequiredInputsCompleted = useRef(0);
  let isPreSurgicalDiagnosticInputOnError = useRef(false);
  let isProposedSurgeonInputOnError = useRef(false);
  let isWeightInputOnError = useRef(false);
  let isHeightInputOnError = useRef(false);
  let firstSectionProduct = useRef(false);
  let isDiastolicPressureInputOnError = useRef(false);
  let isSystolicPressureInputOnError = useRef(false);
  let isPulseInputOnError = useRef(false);
  let isFirstSectionUnresolvedRef = useRef(false);
  let isTreatmentsUnresolvedRef = useRef(false);
  let isMedicalStudiesUnresolvedRef = useRef(false);
  let isRequiredErrorSettedRef = useRef(false);
  let isRequiredDateSettedRef = useRef(false);
  let isInputOnErrorSettedRef = useRef(false);
  let isInnerFormUnresolvedSettedRef = useRef(false);
  let areBothFieldsRequiredBloodPresureRef = useRef(false);
  let areBothFieldsRequiredBloodTypeRef = useRef(false);
  let areDoubleFieldsUnresolvedRef = useRef(false);
  let newWindowRef = useRef(null);
  let pDFFileUrlRef = useRef();
  let downloadButtonRef = useRef();
  let maxDateProp = useRef();

  const headerSectionRef = useMemo(
    () => ({
      isPreSurgicalDiagnosticInputOnError,
      isProposedSurgeonInputOnError,
    }),
    []
  );

  const physicalExamRef = useMemo(
    () => ({
      isMedicalStudiesUnresolvedRef,
      firstSectionRef: {
        isWeightInputOnError,
        isHeightInputOnError,
        bloodPresureForm: [isDiastolicPressureInputOnError, isSystolicPressureInputOnError],
        isPulseInputOnError,
        firstSectionProduct,
      },
    }),
    []
  );

  const physicalExamIsUnresolved = useMemo(
    () => ({
      isFirstSectionUnresolved,
      isMedicalStudiesUnresolved,
    }),
    [isFirstSectionUnresolved, isMedicalStudiesUnresolved]
  );

  const inputsOnErrorRefs = [
    isPreSurgicalDiagnosticInputOnError.current,
    isProposedSurgeonInputOnError.current,
    isWeightInputOnError.current,
    isHeightInputOnError.current,
    isDiastolicPressureInputOnError.current,
    isSystolicPressureInputOnError.current,
    isPulseInputOnError.current,
  ];

  const physicalExamFormIsRequired = useMemo(
    () => ({
      firstSectionErrorState: {
        isRequiredErrorFirstSectionState: isRequiredErrorFirstSection,
        bloodPresureErrorState: areBothFieldsRequiredBloodPresure,
        bloodTypeErrorState: areBothFieldsRequiredBloodType,
      },
      isRequiredAirwaySectionState: isRequiredAirwaySection,
    }),
    [
      isRequiredErrorFirstSection,
      isRequiredAirwaySection,
      areBothFieldsRequiredBloodPresure,
      areBothFieldsRequiredBloodType,
    ]
  );

  const getDateAndTimeFormatted = (dateAndTime) => {
    const formattedDateAndTime = `${dateAndTime.getDate()}/${
      dateAndTime.getMonth() + 1
    }/${dateAndTime.getFullYear()} ${dateAndTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    })}`;
    return formattedDateAndTime;
  };

  const objectCreatorToSubmit = (formState) => {
    const {
      preSurgicalClinical,
      treatments,
      studiesDone,
      physicalExams,
      currentPatient,
      headingSection,
      airwayExams,
      bottomSection,
    } = formState;

    const {
      psychiatric,
      anestheticHistory,
      others,
      ...pSCFormWithCheckboxesState
    } = preSurgicalClinical;

    const pSCFormWithOutCheckboxesState = {
      psychiatric,
      anestheticHistory,
      others,
    };

    const getFormsValuesWithCheckboxes = (state) => {
      const getCheckedCheckboxesFrom = (obj) => {
        let resultingArr = [];
        for (const key in obj) {
          if (obj[key]) {
            resultingArr.push(key);
          }
        }
        return resultingArr;
      };
      let objectToReturn = {};
      const { observations, ...checkboxes } = state;
      const checkedCheckboxesArr = getCheckedCheckboxesFrom(checkboxes);
      const isObservationsInputFilled = observations !== '';
      const isThereCheckedCheckboxes = checkedCheckboxesArr.length !== 0;
      if (isObservationsInputFilled) {
        Object.assign(objectToReturn, { observations });
      }
      if (isThereCheckedCheckboxes) {
        Object.assign(objectToReturn, { conditions: checkedCheckboxesArr });
      }
      return objectToReturn;
    };

    const iterateOver = (state, objectUpdater) => {
      const objectToReturn = {};
      const assignFalseToCurrent = (key, inObj) => Object.assign(inObj, { [key]: false });
      for (const shallowKey in state) {
        const { shouldDisplay, ...rest } = state[shallowKey];
        if (shouldDisplay) {
          const currentUpdate = objectUpdater(rest);
          const isResultingObjEmpty = Object.keys(currentUpdate).length === 0;
          if (isResultingObjEmpty) {
            assignFalseToCurrent(shallowKey, objectToReturn);
          } else Object.assign(objectToReturn, { [shallowKey]: currentUpdate });
        } else {
          assignFalseToCurrent(shallowKey, objectToReturn);
        }
      }
      return objectToReturn;
    };

    const getObservations = (state) => {
      let objectToReturn = {};
      const { observations } = state;
      const isObservationsInputFilled = observations !== '';
      if (isObservationsInputFilled) {
        Object.assign(objectToReturn, { observations });
      }
      return objectToReturn;
    };

    const getArrayFrom = (stateObj) => {
      let arrToReturn = [];
      const { shouldDisplay, ...rest } = stateObj;
      if (shouldDisplay) {
        for (const shallowKey in rest) {
          arrToReturn.push(rest[shallowKey]);
        }
      }
      return arrToReturn;
    };

    const conditionsWithCheckboxes = iterateOver(
      pSCFormWithCheckboxesState,
      getFormsValuesWithCheckboxes
    );
    const conditionWithOutCheckboxes = iterateOver(pSCFormWithOutCheckboxesState, getObservations);
    const treatmentsArr = getArrayFrom(treatments);
    const medicalStudiesArr = getArrayFrom(studiesDone);
    const date = getDateAndTimeFormatted(dateState);

    const objToReturn = {
      conditionsWithCheckboxes,
      conditionWithOutCheckboxes,
      treatments: treatmentsArr,
      medicalStudies: medicalStudiesArr,
      currentPatient,
      headingSection,
      physicalExams,
      airwayExams,
      bottomSection,
      date,
    };
    return objToReturn;
  };

  const getValidationParameter = (state) => {
    const { headingSection, airwayExams, bottomSection } = state;
    return [
      {
        currentValue: headingSection['preSurgicalDiagnostic'],
        currentStateKey: 'preSurgicalDiagnosticIsRequired',
        setState: setIsRequiredErrorHeaderSection,
      },
      {
        currentValue: headingSection['proposedSurgeon'],
        currentStateKey: 'proposedSurgeonIsRequired',
        setState: setIsRequiredErrorHeaderSection,
      },
      {
        currentValue: airwayExams['mouthOpening'],
        currentStateKey: 'mouthOpeningIsRequired',
        setState: setIsRequiredAirwaySection,
      },
      {
        currentValue: airwayExams['malampati'],
        currentStateKey: 'malampatiIsRequired',
        setState: setIsRequiredAirwaySection,
      },
      {
        currentValue: airwayExams['thyromentalDistance'],
        currentStateKey: 'thyromentalDistanceIsRequired',
        setState: setIsRequiredAirwaySection,
      },

      {
        currentValue: airwayExams['goniomentalDistance'],
        currentStateKey: 'goniomentalDistanceIsRequired',
        setState: setIsRequiredAirwaySection,
      },

      {
        currentValue: airwayExams['neckMovement'],
        currentStateKey: 'neckMovementIsRequired',
        setState: setIsRequiredAirwaySection,
      },
      {
        currentValue: airwayExams['teeth'],
        currentStateKey: 'teethIsRequired',
        setState: setIsRequiredAirwaySection,
      },
      {
        currentValue: airwayExams['difficultAirwayForetell'],
        currentStateKey: 'difficultAirwayForetellIsRequired',
        setState: setIsRequiredAirwaySection,
      },
      {
        currentValue: bottomSection['anestheticPlan'],
        currentStateKey: 'anestheticPlanIsRequired',
        setState: setIsRequiredBottomSection,
      },
    ];
  };

  const getValidationParameterForNumberType = (state) => {
    const { physicalExams } = state;
    return [
      {
        currentValue: physicalExams['weight'],
        currentStateKey: 'weightIsRequired',
        setState: setIsRequiredErrorFirstSection,
      },
      {
        currentValue: physicalExams['height'],
        currentStateKey: 'heightIsRequired',
        setState: setIsRequiredErrorFirstSection,
      },
    ];
  };
  const incrementValidatedInputsCount = (countRef) => (countRef.current = countRef.current + 1);
  const manageInputsRequiredError = ({
    shouldSetError,
    currentSetState,
    currentStateKey,
    requiredErrorSettedRef,
    countOfRequiredInputCompletedRef,
  }) => {
    const manageRequiredError = ({ setState, stateKey, ref }) => {
      setState((prevState) => ({
        ...prevState,
        [stateKey]: true,
      }));
      setIsRequiredErrorSetted(true);
      ref.current = true;
    };

    const manageInputValueValidated = ({ setState, stateKey, ref }) => {
      setState((prevState) => ({
        ...prevState,
        [stateKey]: false,
      }));
      incrementValidatedInputsCount(ref);
    };
    if (shouldSetError) {
      manageRequiredError({
        setState: currentSetState,
        stateKey: currentStateKey,
        ref: requiredErrorSettedRef,
      });
    } else {
      manageInputValueValidated({
        setState: currentSetState,
        stateKey: currentStateKey,
        ref: countOfRequiredInputCompletedRef,
      });
    }
  };

  const manageInputsOnErrorRef = ({ refsArr, ref }) => {
    for (const item of refsArr) {
      const isCurrentInputOnError = item === true;
      if (isCurrentInputOnError) {
        ref.current = true;
        return setIsInputOnErrorSetted(true);
      }
    }
    ref.current = false;
    return setIsInputOnErrorSetted(false);
  };

  const manageIsFirstSectionPhysicalExamUnresolvedError = ({
    state,
    firstSectionProductRef,
    firstSectionUnresolvedRef,
    innerFormUnresolvedSettedRef,
  }) => {
    const { bMIndex, tV } = state;
    const firstSectionProductVerification = bMIndex * tV;

    const areFirstSectionInputValuesOutdated =
      firstSectionProductVerification !== firstSectionProductRef.current;
    const areWeightAndHeightInputsFilled = !Number.isNaN(firstSectionProductRef.current);
    const areFirstSectionValuesNotCalculated = firstSectionProductRef.current === 0;
    const isFirstSectionFormUnresolved =
      areFirstSectionInputValuesOutdated || areFirstSectionValuesNotCalculated;

    const setError = () => {
      setIsFirstSectionUnresolved(true);
      firstSectionUnresolvedRef.current = true;
      setIsInnerFormUnresolvedSetted(true);
      innerFormUnresolvedSettedRef.current = true;
    };
    const removeError = () => {
      setIsFirstSectionUnresolved(false);
      firstSectionUnresolvedRef.current = false;
    };

    if (areWeightAndHeightInputsFilled) {
      if (isFirstSectionFormUnresolved) {
        setError();
      } else {
        removeError();
      }
    }
  };

  const manageIsMedicalStudiesFormUnresolvedError = ({
    innerFormUnresolvedSettedRef,
    medicalStudiesUnresolvedRef,
  }) => {
    const setError = () => {
      setIsMedicalStudiesUnresolved(true);
      setIsInnerFormUnresolvedSetted(true);
      innerFormUnresolvedSettedRef.current = true;
    };
    const removeError = () => setIsMedicalStudiesUnresolved(false);
    if (medicalStudiesUnresolvedRef.current) {
      setError();
    } else {
      removeError();
    }
  };

  const manageIsTreatmentsFormUnresolvedError = ({
    treatmentsUnresolvedRef,
    innerFormUnresolvedSettedRef,
  }) => {
    const setError = () => {
      setIsTreatmentsUnresolved(true);
      setIsInnerFormUnresolvedSetted(true);
      innerFormUnresolvedSettedRef.current = true;
    };
    const removeError = () => setIsTreatmentsUnresolved(false);
    if (treatmentsUnresolvedRef.current) {
      setError();
    } else {
      removeError();
    }
  };

  const manageMedicalStudiesRequired = (state) => {
    const getCompletedMedicalStudies = (completedMedicalStudies) => {
      const array = [];
      for (const key in completedMedicalStudies) {
        array.push(key);
      }
      return array;
    };
    const getCompleteRequiredMedicalStudies = (completedStudies) =>
      completedStudies.filter(
        (item) =>
          item === 'electrocardiogram' ||
          item === 'hematocrit' ||
          item === 'hemoglobin' ||
          item === 'prothrombinTime' ||
          item === 'kAPT'
      );
    const getRequiredStudiesMissing = ({ requiredStudies, completedRequiredStudiesArr }) => {
      const arr = requiredStudies.filter((study) => {
        for (const completedStudy of completedRequiredStudiesArr) {
          const itMatches = study['name'] === completedStudy;
          if (itMatches) {
            return false;
          }
        }
        return true;
      });

      return arr;
    };
    const getLabelsOfRequiredStudiesMissing = (missingStudies) => {
      const arr = [];
      for (const obj of missingStudies) {
        const label = obj['label'];
        arr.push(label);
      }
      return arr;
    };
    const requiredStudiesArr = [
      { name: 'electrocardiogram', label: 'Electrocardiográma' },
      { name: 'hematocrit', label: 'Hematocritos' },
      { name: 'hemoglobin', label: 'Hemoglobina' },
      { name: 'prothrombinTime', label: 'Tp' },
      { name: 'kAPT', label: 'Kptt' },
    ];
    const completedStudiesArr = getCompletedMedicalStudies(state);
    const completedRequiredStudies = getCompleteRequiredMedicalStudies(completedStudiesArr);
    const requiredStudiesMissing = getRequiredStudiesMissing({
      requiredStudies: requiredStudiesArr,
      completedRequiredStudiesArr: completedRequiredStudies,
    });
    const labelsOfRequiredStudiesMissing = getLabelsOfRequiredStudiesMissing(
      requiredStudiesMissing
    );
    const stringToRetur = labelsOfRequiredStudiesMissing.join('-');

    setMedicalStudiesRequired(stringToRetur);
    setIsMedicalStudiesRequiredErrorSetted(() => (stringToRetur === '' ? false : true));
  };

  const manageDoubleFieldsValidation = ({ state, refs }) => {
    const manageAreBothDoubleFieldsCompleted = ({
      firstValue,
      secondValue,
      bothFieldsRequiredRef,
      bothFieldsRequiredStateUpdater,
    }) => {
      const isOnlyOneFieldCompleted =
        (firstValue !== '' && secondValue === '') || (firstValue === '' && secondValue !== '');
      if (isOnlyOneFieldCompleted) {
        bothFieldsRequiredRef.current = true;
        bothFieldsRequiredStateUpdater(true);
      } else {
        bothFieldsRequiredRef.current = false;
        bothFieldsRequiredStateUpdater(false);
      }
    };
    const updateDoubleFieldsUnresolvedRef = ({
      bloodPresureRef,
      bloodTypeRef,
      doubleFieldsUnresolvedRef,
    }) => {
      if (bloodPresureRef.current === true || bloodTypeRef.current === true) {
        doubleFieldsUnresolvedRef.current = true;
      } else {
        doubleFieldsUnresolvedRef.current = false;
      }
    };

    const { bloodPresure, bloodType, doubleFieldsUnresolved } = refs;
    const diastolicPressureVal = state.diastolicPressure;
    const systolicPressureVal = state.systolicPressure;
    const bloodTypeVal = state.bloodType;
    const factorRhVal = state.factorRh;

    manageAreBothDoubleFieldsCompleted({
      firstValue: diastolicPressureVal,
      secondValue: systolicPressureVal,
      bothFieldsRequiredRef: bloodPresure,
      bothFieldsRequiredStateUpdater: setAreBothFieldsRequiredBloodPresure,
    });
    manageAreBothDoubleFieldsCompleted({
      firstValue: bloodTypeVal,
      secondValue: factorRhVal,
      bothFieldsRequiredRef: bloodType,
      bothFieldsRequiredStateUpdater: setAreBothFieldsRequiredBloodType,
    });
    updateDoubleFieldsUnresolvedRef({
      bloodPresureRef: bloodPresure,
      bloodTypeRef: bloodType,
      doubleFieldsUnresolvedRef: doubleFieldsUnresolved,
    });
  };

  const manageDateRequiredError = (refs) => {
    const setError = (refObj) => {
      const { isRequiredDateSetted, requiredErrorSetted } = refObj;
      isRequiredDateSetted.current = true;
      setIsRequiredDateAndTime(true);
      setIsRequiredErrorSetted(true);
      requiredErrorSetted.current = true;
    };
    const manageRequiredDateValidated = (refObj) => {
      const { requiredInputsCompletedRef, isRequiredDateSetted } = refObj;
      isRequiredDateSetted.current = false;
      setIsRequiredDateAndTime(false);
      incrementValidatedInputsCount(requiredInputsCompletedRef);
    };

    const isDateInvalid = dateState === null || dateState == 'Invalid Date';

    if (isDateInvalid) {
      setError(refs);
    } else {
      manageRequiredDateValidated(refs);
    }
  };

  const manageAllRequiredInputsCompleted = ({
    requiredInputsCompletedRef,
    requiredErrorSettedRef,
  }) => {
    const removeRequiredError = (ref) => {
      setIsRequiredErrorSetted(false);
      ref.current = false;
    };
    const resetCount = (ref) => (ref.current = 0);

    const areAllRequiredInputsCompleted = requiredInputsCompletedRef.current === 13;

    if (areAllRequiredInputsCompleted) {
      removeRequiredError(requiredErrorSettedRef);
    }
    resetCount(requiredInputsCompletedRef);
  };

  const validateFormOnClickFor = ({ state, refs }) => () => {
    const { physicalExams, studiesDone } = state;
    const {
      requiredErrorSettedRef,
      countOfRequiredInputCompletedRef,
      firstSectionProductRef,
      firstSectionUnresolvedRef,
      innerFormUnresolvedSettedRef,
      treatmentsUnresolvedRef,
      medicalStudiesUnresolvedRef,
      requiredDateSettedRef,
      bloodPresure,
      bloodType,
      doubleFieldsUnresolved,
    } = refs;
    getValidationParameter(state).forEach((item) => {
      const shouldSetError = item.currentValue === '';
      manageInputsRequiredError({
        shouldSetError,
        currentSetState: item.setState,
        currentStateKey: item.currentStateKey,
        requiredErrorSettedRef,
        countOfRequiredInputCompletedRef,
      });
    });
    getValidationParameterForNumberType(state).forEach((item) => {
      const shouldSetError = item.currentValue === '' || item.currentValue == 0;
      manageInputsRequiredError({
        shouldSetError,
        currentSetState: item.setState,
        currentStateKey: item.currentStateKey,
        requiredErrorSettedRef,
        countOfRequiredInputCompletedRef,
      });
    });

    manageDateRequiredError({
      isRequiredDateSetted: requiredDateSettedRef,
      requiredErrorSetted: requiredErrorSettedRef,
      requiredInputsCompletedRef: countOfRequiredInputCompletedRef,
    });

    manageAllRequiredInputsCompleted({
      requiredInputsCompletedRef: countOfRequiredInputCompletedRef,
      requiredErrorSettedRef,
    });

    manageInputsOnErrorRef({
      refsArr: inputsOnErrorRefs,
      ref: isInputOnErrorSettedRef,
    });
    manageIsFirstSectionPhysicalExamUnresolvedError({
      state: physicalExams,
      firstSectionProductRef,
      firstSectionUnresolvedRef,
      innerFormUnresolvedSettedRef,
    });
    manageIsMedicalStudiesFormUnresolvedError({
      innerFormUnresolvedSettedRef,
      medicalStudiesUnresolvedRef,
    });
    manageIsTreatmentsFormUnresolvedError({
      treatmentsUnresolvedRef,
      innerFormUnresolvedSettedRef,
    });
    manageDoubleFieldsValidation({
      state: physicalExams,
      refs: {
        bloodPresure,
        bloodType,
        doubleFieldsUnresolved,
      },
    });
    if (
      firstSectionUnresolvedRef.current === false &&
      treatmentsUnresolvedRef.current === false &&
      medicalStudiesUnresolvedRef.current === false
    ) {
      setIsInnerFormUnresolvedSetted(false);
      innerFormUnresolvedSettedRef.current = false;
    }
    manageMedicalStudiesRequired(studiesDone);
    if (
      isInputOnErrorSettedRef.current === false &&
      innerFormUnresolvedSettedRef.current === false &&
      isRequiredDateSettedRef.current === false &&
      areDoubleFieldsUnresolvedRef.current === false
    ) {
      setIsValidated(true);
      setFormGlobalState((prevState) => ({
        ...prevState,
        date: getDateAndTimeFormatted(dateState),
      }));
      setPreSurgicalFormPDFData(objectCreatorToSubmit(formGlobalState));
    }
  };

  const validateFormOnClick = validateFormOnClickFor({
    state: formGlobalState,
    refs: {
      requiredErrorSettedRef: isRequiredErrorSettedRef,
      countOfRequiredInputCompletedRef: countOfRequiredInputsCompleted,
      firstSectionProductRef: firstSectionProduct,
      firstSectionUnresolvedRef: isFirstSectionUnresolvedRef,
      innerFormUnresolvedSettedRef: isInnerFormUnresolvedSettedRef,
      treatmentsUnresolvedRef: isTreatmentsUnresolvedRef,
      medicalStudiesUnresolvedRef: isMedicalStudiesUnresolvedRef,
      bloodPresure: areBothFieldsRequiredBloodPresureRef,
      bloodType: areBothFieldsRequiredBloodTypeRef,
      doubleFieldsUnresolved: areDoubleFieldsUnresolvedRef,
      requiredDateSettedRef: isRequiredDateSettedRef,
    },
  });

  const getTextForMedicalStudiesRequiredError = (dynamicText) =>
    `Estudios faltantes: "${dynamicText}". Se requiere que todos los estudios requeridos esten cargados antes de guardar el formulario como Completado.`;

  const titleIsRequiredErrorSetted = 'Campos requeridos incompletos.';
  const titleForAreMedicalStudiesRequiredErrorSetted = 'Faltan estudios requeridos.';
  const textForAreMedicalStudiesRequiredErrorSetted = getTextForMedicalStudiesRequiredError(
    medicalStudiesRequired
  );

  const validationMessagesArr = useMemo(
    () => [
      {
        title: 'Fecha y hora requerida.',
        text: 'Debe ingresar un valor válido antes de continuar.',
        shouldDisplay: isRequiredDateAndTime,
        headerClassName: classes.errorSettedRedText,
      },
      {
        title: 'Campos dobles incompletos.',
        text:
          'Se han detectado campos dobles con solo una entrada completa, no son campos requeridos pero si ingreso un valor ambos campos deben estar completos para poder continuar.',
        shouldDisplay: areBothFieldsRequiredBloodPresure || areBothFieldsRequiredBloodType,
        headerClassName: classes.errorSettedRedText,
      },
      {
        title: titleIsRequiredErrorSetted,
        text:
          'Solo podrá guardar el formulario como incompleto, para resolver complételos según corresponda, luego regrese aquí y vuelva a intentar la validación.',
        shouldDisplay: isRequiredErrorSetted,
        headerClassName: classes.errorSettedRedText,
      },
      {
        title: 'Valores no válidos.',
        text:
          'Revise el formulario y corríjalos según corresponda, luego regrese aquí y vuelva a intertar la validación.',
        shouldDisplay: isInputOnErrorSetted,
        headerClassName: classes.errorSettedRedText,
      },
      {
        title: 'Formularios no resueltos.',
        text:
          'Se han detectado campos con datos sin agregar, este error se puede presentar en los formularios de Tratamientos, Estudios, o en la subsección de Exámen Físico para calcular IMC, PI, PIC y VT cuando los mismos no han sido resueltos por el usuario, resuelva lo solicitado en el formulario corespondiente luego regrese aqui y vuelva a intentar la validación.',
        shouldDisplay: isInnerFormUnresolvedSetted,
        headerClassName: classes.errorSettedRedText,
      },
      {
        title: titleForAreMedicalStudiesRequiredErrorSetted,
        text: textForAreMedicalStudiesRequiredErrorSetted,
        shouldDisplay: areMedicalStudiesRequiredErrorSetted,
        headerClassName: classes.errorSettedBlueText,
      },
    ],
    [
      isRequiredDateAndTime,
      classes.errorSettedRedText,
      classes.errorSettedBlueText,
      areBothFieldsRequiredBloodPresure,
      areBothFieldsRequiredBloodType,
      titleForAreMedicalStudiesRequiredErrorSetted,
      textForAreMedicalStudiesRequiredErrorSetted,
      areMedicalStudiesRequiredErrorSetted,
      isInnerFormUnresolvedSetted,
      isInputOnErrorSetted,
      isRequiredErrorSetted,
    ]
  );

  const handleSubmittForm = (formStatus) => () => {
    const shouldSubmittAsCompleted = formStatus === 'completed';
    setPreSurgicalFormPDFData((prevState) => ({
      ...prevState,
      status: formStatus,
    }));
    setFormDataWasSended(true);
    setIsValidated(false);
    if (shouldSubmittAsCompleted) {
      setFormDataWasSendedAsCompleted(true);
    }
  };

  const handleDateTimeDebounce = useDebouncedCallback(setDateState, 250, { trailing: true });

  const setStatesGroupForModal = useMemo(
    () => ({
      setIsValidated,
      setIsPreviewClicked,
    }),
    [setIsValidated, setIsPreviewClicked]
  );

  const conditionsGroupForModal = useMemo(
    () => ({
      isValidated,
      areMedicalStudiesRequiredErrorSetted,
      isRequiredErrorSetted,
    }),
    [isValidated, areMedicalStudiesRequiredErrorSetted, isRequiredErrorSetted]
  );

  const staticTextsGroup = useMemo(
    () => ({
      titleIsRequiredErrorSetted,
      titleForAreMedicalStudiesRequiredErrorSetted,
      textForAreMedicalStudiesRequiredErrorSetted,
    }),
    [
      titleIsRequiredErrorSetted,
      titleForAreMedicalStudiesRequiredErrorSetted,
      textForAreMedicalStudiesRequiredErrorSetted,
    ]
  );

  const classNamesGroup = useMemo(
    () => ({
      errorSettedBlueText: classes.errorSettedBlueText,
      bottomLine: classes.bottomLine,
    }),
    [classes.errorSettedBlueText, classes.bottomLine]
  );

  const refsGroupForPDFMaker = useMemo(
    () => ({
      pDFFileUrlRef,
      newWindowRef,
    }),
    [pDFFileUrlRef, newWindowRef]
  );

  useEffect(() => {
    setFormGlobalState(initialFormState);
  }, [initialFormState]);

  return [
    {
      contextObject,
      isPreviewClicked,
      isRequiredErrorHeaderSection,
      isRequiredBottomSection,
      isTreatmentsUnresolved,
      formDataWasSended,
      formDataWasSendedAsCompleted,
      preSurgicalFormPDFData,
      downloadButtonRef,
      headerSectionRef,
      physicalExamRef,
      physicalExamIsUnresolved,
      physicalExamFormIsRequired,
      validationMessagesArr,
      conditionsGroupForModal,
      staticTextsGroup,
      classNamesGroup,
      refsGroupForPDFMaker,
      maxDateProp,
      dateState,
      isRequiredDateAndTime,
      medicalStudiesRequired,
      isTreatmentsUnresolvedRef,
      currentPatient: formGlobalState.currentPatient,
      pDFFileUrlRef,
    },
    {
      validateFormOnClick,
      handleSubmittForm,
      handleDateTimeDebounce,
      setStatesGroupForModal,
      setIsPreviewClicked,
    },
  ];
};

export default useForm;
