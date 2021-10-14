import { PreSurgical } from 'context/PreSurgical';
import { useContext } from 'react';
import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useForm = (ref, isUnresolvedError) => {
  const { initialState, updateGlobalState } = useContext(PreSurgical);

  let isWeightInputOnErrorLocal = useRef();
  let isHeightInputOnErrorLocal = useRef();

  const { physicalExams, currentPatient } = initialState;

  const { gender } = currentPatient;

  const { weight, height, vTFactor, bMIndex, bMI, bMIC, tV } = physicalExams;

  const { isWeightInputOnError, isHeightInputOnError, firstSectionProduct } = ref;

  const defaultInputError = useMemo(
    () => ({
      weightInputError: false,
      heightInputError: false,
    }),
    []
  );

  const [weightState, setWeightState] = useState(weight);
  const [heightState, setHeightState] = useState(height);
  const [vTFactorState, setVTFactorState] = useState(vTFactor);
  const [isRequired, setIsRequired] = useState(defaultInputError);
  const [bMIndexValue, setBMIndexValue] = useState(bMIndex);
  const [bMIValue, setBMIValue] = useState(bMI);
  const [bMICValue, setBMICValue] = useState(bMIC);
  const [tVValue, setTVValue] = useState(tV);
  const [isUnresolved, setIsUnresolved] = useState(false);

  const setRequiredError = useCallback(() => {
    if (weightState === '' || weightState == 0) {
      setIsRequired((prevState) => ({
        ...prevState,
        weightInputError: true,
      }));
    }
    if (heightState === '' || heightState == 0) {
      setIsRequired((prevState) => ({
        ...prevState,
        heightInputError: true,
      }));
    }
  }, [weightState, heightState]);

  const removeRequiredError = (name) =>
    setIsRequired((prevState) => ({
      ...prevState,
      [name]: false,
    }));

  const getRoundedResult = useCallback((number) => {
    const stringNumber = number.toString();
    const twoPlacesAfterDot = 3;
    const toIndex = stringNumber.indexOf('.') + twoPlacesAfterDot;
    return Number(stringNumber.slice(0, toIndex));
  }, []);

  const updateState = (newValues) =>
    updateGlobalState((prevState) => ({
      ...prevState,
      physicalExams: {
        ...prevState['physicalExams'],
        ...newValues,
      },
    }));

  const calculateBMIndex = (weightVal, heightVal) => weightVal / Math.pow(heightVal / 100, 2);
  const calculateBMIC = (bMIVal, weightVal) => bMIVal + 0.25 * (weightVal - bMIVal);
  const calculateTV = (bMIVal, vTfactorVal) => bMIVal * vTfactorVal;
  const calculateBMIdeal = (genderVal, heightVal) =>
    (genderVal === 'male' ? 50 : 45.5) + 0.91 * (heightVal - 152.4);

  const getHandlerToCalculate = (weightVal, heightVal, vTfactorVal, genderVal) => () => {
    if (
      weightVal !== '' &&
      weightVal != 0 &&
      !isWeightInputOnErrorLocal.current &&
      heightVal !== '' &&
      heightVal != 0 &&
      !isHeightInputOnErrorLocal.current
    ) {
      const bMIdeal = getRoundedResult(calculateBMIdeal(genderVal, heightVal));
      const bMIndexVal = getRoundedResult(calculateBMIndex(weightVal, heightVal));
      const bMICVal = getRoundedResult(calculateBMIC(bMIdeal, weightVal));
      const tVVal = getRoundedResult(calculateTV(bMIdeal, vTfactorVal));
      updateState({
        ['bMIndex']: bMIndexVal,
        ['bMI']: bMIdeal,
        ['bMIC']: bMICVal,
        ['tV']: tVVal,
      });
      setBMIValue(bMIdeal);
      setBMIndexValue(bMIndexVal);
      setBMICValue(bMICVal);
      setTVValue(tVVal);
      setIsRequired(defaultInputError);
    } else setRequiredError();
  };

  const calculateOnClick = getHandlerToCalculate(weightState, heightState, vTFactorState, gender);

  const handleOnChangeFor = (name, setState) => (value) => {
    setState ? setState(value) : null;
    updateState({
      [name]: value,
    });
  };

  const handleWeightOnChange = (value) => {
    setWeightState(value);
    updateState({
      weight: value,
    });
    removeRequiredError('weight');
  };

  const handleHeightOnchange = (value) => {
    setHeightState(value);
    updateState({
      height: value,
    });
    removeRequiredError('height');
  };

  const handleWeightDebounced = useDebouncedCallback(handleWeightOnChange, 250, { trailing: true });

  const handleVTFactorDebounced = useDebouncedCallback(
    handleOnChangeFor('vTFactor', setVTFactorState),
    250,
    {
      trailing: true,
    }
  );

  const handleHeightDebounced = useDebouncedCallback(handleHeightOnchange, 250, { trailing: true });

  const handlePulseDebounced = useDebouncedCallback(
    handleOnChangeFor('pulse', setVTFactorState),
    250,
    {
      trailing: true,
    }
  );

  const handleCardiacAuscultationDebounced = useDebouncedCallback(
    handleOnChangeFor('cardiacAuscultation', setVTFactorState),
    250,
    {
      trailing: true,
    }
  );

  const handlePulmonaryAuscultationDebounced = useDebouncedCallback(
    handleOnChangeFor('pulmonaryAuscultation', setVTFactorState),
    250,
    {
      trailing: true,
    }
  );

  const handleSpineDebounced = useDebouncedCallback(
    handleOnChangeFor('spine', setVTFactorState),
    250,
    {
      trailing: true,
    }
  );

  const handlePainLevelDebounced = useDebouncedCallback(
    handleOnChangeFor('painLevel', setVTFactorState),
    250,
    {
      trailing: true,
    }
  );

  const handleAsaLevelDebounced = useDebouncedCallback(
    handleOnChangeFor('asaLevel', setVTFactorState),
    250,
    {
      trailing: true,
    }
  );

  const handleObservationsDebounced = useDebouncedCallback(
    handleOnChangeFor('observations', setVTFactorState),
    250,
    {
      trailing: true,
    }
  );

  const manageIsUnresolvedOnProp = useCallback((prop) => {
    if (prop) {
      setIsUnresolved(true);
    } else {
      setIsUnresolved(false);
    }
  }, []);

  const matchRefs = useCallback((updateRef1, withRef1) => {
    updateRef1.current = withRef1.current;
  }, []);

  const updateRefForValidation = useCallback(
    (weightVal, heightVal, bMIVal, vTFactorVal, refToUpdate) => {
      const currentBMIndex = getRoundedResult(weightVal / Math.pow(heightVal / 100, 2));
      const currentTV = getRoundedResult(bMIVal * vTFactorVal);
      refToUpdate.current = currentBMIndex * currentTV;
    },
    [getRoundedResult]
  );

  useEffect(() => manageIsUnresolvedOnProp(isUnresolvedError), [
    isUnresolvedError,
    manageIsUnresolvedOnProp,
  ]);
  useEffect(() => {
    matchRefs(isWeightInputOnError, isWeightInputOnErrorLocal);
    matchRefs(isHeightInputOnError, isHeightInputOnErrorLocal);
  });
  useEffect(() => {
    updateRefForValidation(weightState, heightState, bMIValue, vTFactorState, firstSectionProduct);
  }, [
    weightState,
    heightState,
    bMIValue,
    vTFactorState,
    firstSectionProduct,
    updateRefForValidation,
  ]);

  useEffect(() => {
    setWeightState(weight);
    setHeightState(height);
    setVTFactorState(vTFactor);
  }, [weight, height, vTFactor]);

  return [
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
  ];
};

export default useForm;
