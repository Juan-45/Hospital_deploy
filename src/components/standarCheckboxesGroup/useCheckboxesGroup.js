import { useEffect, useState } from 'react';

const useCheckboxesGroup = (evaluateValuesEffect) => {
  const [checkboxesValues, setCheckboxesValues] = useState();

  useEffect(() => {
    if (evaluateValuesEffect) {
      evaluateValuesEffect(checkboxesValues);
    }
  }, [evaluateValuesEffect, checkboxesValues]);

  return [setCheckboxesValues];
};

export default useCheckboxesGroup;
