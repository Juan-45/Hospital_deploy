import { useState, useEffect, useCallback } from 'react';

const useInput = (value, ref, isRequiredError, shouldReset, maxLength, pattern, nestedHandler) => {
  const [helperText, setHelperText] = useState();
  const [errorState, setErrorState] = useState();
  const [isLocalErrorSetted, setIsLocalErrorSetted] = useState(false);
  const [valueState, setValueState] = useState(value ? value : '');

  const checkIfPropExists = useCallback((prop) => (prop ? true : false), []);
  const thereIsMaxLength = checkIfPropExists(maxLength);

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

  const checkIfValueIsValid = useCallback(
    (inputValue, patternProp) => {
      const findMatches = (val, regExpPattern) => val.match(regExpPattern);
      const setItMatches = (matches) => (matches ? true : false);
      const defaultPattern = /^([a-zA-ZÀ-ÿ\u00f1\u00d10-9]+\s?)*([a-zA-ZÀ-ÿ\u00f1\u00d10-9])?$/;
      const thereIsPattern = checkIfPropExists(patternProp);
      let matches;
      if (thereIsPattern) {
        matches = findMatches(inputValue, patternProp);
      } else {
        matches = findMatches(inputValue, defaultPattern);
      }
      return setItMatches(matches);
    },
    [checkIfPropExists]
  );

  const setInvalidFormatError = useCallback(
    (patternProp, refProp) => {
      const thereIsPattern = checkIfPropExists(patternProp);
      setErrorRefTo(true, refProp);
      setErrorState(true);
      setIsLocalErrorSetted(true);
      if (thereIsPattern) {
        setHelperText('Formato Inválido');
      } else {
        setHelperText(
          'Formato Invalido, aseguresé que no haya espacios de más o caracteres especiales.'
        );
      }
    },
    [checkIfPropExists, setErrorRefTo]
  );

  const setIsExceedingMaxLengthError = useCallback(
    (maxLengthProp, refProp) => {
      setErrorState(true);
      setHelperText(`El texto es demasiado largo, no debe superar ${maxLengthProp} carácteres`);
      setErrorRefTo(true, refProp);
      setIsLocalErrorSetted(true);
    },
    [setErrorRefTo]
  );

  const manageValidation = ({ thereIsMaxLengthCondition, patternProp, maxLengthProp, refProp }) => (
    event
  ) => {
    const isValueValid = checkIfValueIsValid(event.target.value, patternProp);
    if (!isValueValid) {
      setInvalidFormatError(patternProp, refProp);
    } else if (thereIsMaxLengthCondition) {
      const isExceedingMaxLength = event.target.value.length > maxLengthProp;
      if (isExceedingMaxLength) {
        setIsExceedingMaxLengthError(maxLengthProp, refProp);
      } else {
        removeErrorState(refProp);
      }
    } else {
      removeErrorState(refProp);
    }
    setValueState(event.target.value);
    nestedHandler(event.target.value);
  };

  const handleOnChange = manageValidation({
    thereIsMaxLengthCondition: thereIsMaxLength,
    patternProp: pattern,
    maxLengthProp: maxLength,
    refProp: ref,
  });

  const setRequiredErrorOn = useCallback(
    ({ isRequiredErrorProp, isLocalErrorSettedState, inputValue }) => {
      const isValueEmpty = inputValue === '';
      const setRequiredFieldError = () => {
        setErrorState(true);
        setHelperText('Campo Requerido');
      };
      if (isValueEmpty && isRequiredErrorProp) {
        setRequiredFieldError();
      } else if (!isLocalErrorSettedState) {
        removeErrorState();
      }
    },
    [removeErrorState]
  );

  const updateStateValueOn = useCallback(
    (valueProp) => setValueState(valueProp ? valueProp : ''),
    []
  );

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
    [setRequiredErrorOn, isRequiredError, isLocalErrorSetted, valueState]
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
  ];
};

export default useInput;
