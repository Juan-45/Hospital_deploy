import { useState, useEffect, useCallback } from 'react';

const useInput = (inputProps, value, ref, isRequiredError, shouldReset, nestedHandler) => {
  const [helperText, setHelperText] = useState();
  const [errorState, setErrorState] = useState();
  const [isLocalErrorSetted, setIsLocalErrorSetted] = useState(false);
  const [valueState, setValueState] = useState(value ? value : '');

  const checkIfPropExists = useCallback(
    (propObj, nestedPropKey) => (propObj && propObj[nestedPropKey] ? true : false),
    []
  );
  const mayValueHaveDecimals = checkIfPropExists(inputProps, 'decimalplaces');

  const checkIfValueIsValid = useCallback((inputValue, mayValueHaveDecimalsCondition) => {
    const findMatches = (val, regExpPattern) => val.match(regExpPattern);
    const setItMatches = (matches) => (matches ? true : false);
    const patternForDecimals = /^([0-9]+([.]?[0-9]*)?)?$/;
    const patternForIntegers = /^[0-9]*$/;
    let matches;
    if (mayValueHaveDecimalsCondition) {
      matches = findMatches(inputValue, patternForDecimals);
    } else {
      matches = findMatches(inputValue, patternForIntegers);
    }
    return setItMatches(matches);
  }, []);

  const checkIfValueIsExceedingMax = useCallback(
    (inputValue, inputPropObj) => {
      const compareIfIsGreaterThan = (val, max) => parseFloat(val) > max;
      const thereIsMaxValue = checkIfPropExists(inputPropObj, 'max');
      return thereIsMaxValue ? compareIfIsGreaterThan(inputValue, inputPropObj.max) : false;
    },
    [checkIfPropExists]
  );

  const setErrorRefTo = useCallback((bool, refProp) => refProp && (refProp.current = bool), []);

  const removeErrorState = useCallback(
    (refProp) => {
      setHelperText(null);
      setErrorState(false);
      setErrorRefTo(false, refProp);
      setIsLocalErrorSetted(false);
    },
    [setErrorRefTo]
  );

  const setInvalidFormatError = useCallback(
    (refProp) => {
      setErrorState(true);
      setHelperText('Formato Invalido');
      setErrorRefTo(true, refProp);
      setIsLocalErrorSetted(true);
    },
    [setErrorRefTo]
  );

  const setIsExceedingMaxError = useCallback(
    (maxValue, refProp) => {
      setErrorState(true);
      setHelperText(`El límite es ${maxValue}`);
      setErrorRefTo(true, refProp);
      setIsLocalErrorSetted(true);
    },
    [setErrorRefTo]
  );

  const manageValidation = ({ mayValueHaveDecimalsCondition, propObj, refProp }) => (event) => {
    const isValueValid = checkIfValueIsValid(event.target.value, mayValueHaveDecimalsCondition);
    const isExceedingMax = checkIfValueIsExceedingMax(event.target.value, propObj);
    let valueToReturn;
    if (!isValueValid) {
      setInvalidFormatError(refProp);
      valueToReturn = event.target.value;
    } else if (isExceedingMax) {
      setIsExceedingMaxError(propObj.max, refProp);
      valueToReturn = event.target.value;
    } else if (mayValueHaveDecimalsCondition) {
      const splittedValue = event.target.value.split('.');
      const mayValueHaveDecimalPart = splittedValue.length > 1;
      const isValueInteger = splittedValue.length === 1;
      if (mayValueHaveDecimalPart) {
        const truncatedDecimalPart = splittedValue[1].slice(0, propObj.decimalplaces);
        const integerPart = splittedValue[0];
        const isDecimalPartEmpty = truncatedDecimalPart === '';
        valueToReturn = `${integerPart}.${truncatedDecimalPart}`;
        if (isDecimalPartEmpty) {
          valueToReturn = event.target.value;
        }
      } else if (isValueInteger) {
        valueToReturn = event.target.value;
      }
      const isEdgeCaseSetted = parseInt(splittedValue[0]) === 0 && parseInt(splittedValue[1]) === 0;
      if (!isEdgeCaseSetted) {
        removeErrorState(refProp);
      }
    } else {
      valueToReturn = event.target.value;
      removeErrorState(refProp);
    }
    setValueState(valueToReturn);
    nestedHandler(valueToReturn);
  };

  const handleOnChange = manageValidation({
    mayValueHaveDecimalsCondition: mayValueHaveDecimals,
    propObj: inputProps,
    refProp: ref,
  });

  const setRequiredErrorOn = useCallback(
    ({ isRequiredErrorProp, isLocalErrorSettedState, inputValue }) => {
      const isValueEmpty = inputValue === '';
      const isValueEqualToZero = parseFloat(inputValue) === 0;
      const setRequiredFieldError = () => {
        setErrorState(true);
        setHelperText('Campo Requerido');
      };
      if ((isValueEmpty || isValueEqualToZero) && isRequiredErrorProp) {
        setRequiredFieldError();
      } else if (!isLocalErrorSettedState) {
        removeErrorState();
      }
    },
    [removeErrorState]
  );

  const updateStateValueOn = useCallback((valueProp) => setValueState(valueProp), []);

  const resetStateValueOn = useCallback((shouldResetProp) => {
    if (shouldResetProp) {
      setValueState('');
    }
  }, []);

  useEffect(
    () =>
      setRequiredErrorOn({
        isRequiredErrorProp: isRequiredError,
        isLocalErrorSettedState: isLocalErrorSetted,
        inputValue: valueState,
      }),
    [isRequiredError, isLocalErrorSetted, valueState, setRequiredErrorOn]
  );

  useEffect(() => updateStateValueOn(value), [value, updateStateValueOn]);
  useEffect(() => resetStateValueOn(shouldReset), [shouldReset, resetStateValueOn]);

  return [
    {
      helperText,
      errorState,
      valueState,
    },
    handleOnChange,
    setValueState,
  ];
};

export default useInput;
