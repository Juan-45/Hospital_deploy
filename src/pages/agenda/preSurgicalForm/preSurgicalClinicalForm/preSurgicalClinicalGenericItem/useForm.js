import { useState, useCallback, useMemo, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useForm = (setFormState, currentShallowStateKey, formValues) => {
  const formValuesMemoized = useMemo(() => {
    const { shouldDisplay, observations, ...checkboxes } = formValues;
    return {
      shouldDisplay,
      observations,
      checkboxes,
    };
  }, [formValues]);

  const { shouldDisplay, observations, checkboxes } = formValuesMemoized;

  const [shouldRender, setShouldRender] = useState(shouldDisplay);
  const [shouldDisplayModal, setShouldDisplayModal] = useState(false);
  const [isTextAreaFieldWithValue, setIsTextAreaFieldWithValue] = useState();
  const [isACheckboxChecked, setIsACheckboxChecked] = useState();

  const areThereCheckboxes = Object.keys(checkboxes).length !== 0;
  const shouldDisplayModalCondition =
    shouldRender === true && (isACheckboxChecked || isTextAreaFieldWithValue);

  const createDefaultLocalValues = ({ condition, objectToIterate }) => {
    let defaultObj = {};
    if (condition) {
      for (let key in objectToIterate) {
        defaultObj[key] = false;
      }
    }
    defaultObj['shouldDisplay'] = false;
    defaultObj['observations'] = '';
    return defaultObj;
  };

  const defaultValues = createDefaultLocalValues({
    condition: areThereCheckboxes,
    objectToIterate: checkboxes,
  });

  const handleSwitchIf = (condition) => () => {
    if (condition) {
      setShouldDisplayModal(true);
    } else {
      setShouldRender((prevState) => !prevState);
    }
  };

  const handleSwitch = handleSwitchIf(shouldDisplayModalCondition);

  const updateGlobalState = useCallback(
    (currentValues) => {
      setFormState((prevState) => {
        const shallowObj = prevState['preSurgicalClinical'];
        const nestedObj = shallowObj[currentShallowStateKey];
        const updatedObj = {
          ...prevState,
          ['preSurgicalClinical']: {
            ...shallowObj,
            [currentShallowStateKey]: {
              ...nestedObj,
              ['shouldDisplay']: true,
              ...currentValues,
            },
          },
        };
        return updatedObj;
      });
    },
    [currentShallowStateKey, setFormState]
  );

  const handleObservationsDebounced = useDebouncedCallback(
    (value) => {
      updateGlobalState({ ['observations']: value });
    },
    250,
    { trailing: true }
  );

  const handleCheckboxes = (event) => {
    updateGlobalState({ [event.target.name]: event.target.checked });
  };

  const handleAcceptButton = () => {
    updateGlobalState(defaultValues);
    setShouldRender(false);
    setShouldDisplayModal(false);
  };

  const handleCancelButton = () => {
    setShouldDisplayModal(false);
  };

  const evaluateTextAreaValue = (value) => {
    const isTextAreaFilled = value !== '';
    if (isTextAreaFilled) {
      setIsTextAreaFieldWithValue(true);
    } else setIsTextAreaFieldWithValue(false);
  };

  const evaluateCheckboxesGroupValue = (values) => {
    for (const key in values) {
      if (values[key] === true) {
        return setIsACheckboxChecked(true);
      }
    }
    return setIsACheckboxChecked(false);
  };

  useEffect(() => {
    if (shouldDisplay) {
      setShouldRender(shouldDisplay);
    }
  }, [shouldDisplay]);
  useEffect(() => {
    if (shouldRender) {
      updateGlobalState(formValues);
    }
  }, [updateGlobalState, formValues, shouldRender]);

  return [
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
  ];
};

export default useForm;
