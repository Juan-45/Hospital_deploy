import { PreSurgical } from 'context/PreSurgical';
import { useContext } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useForm = () => {
  const { initialState, updateGlobalState } = useContext(PreSurgical);

  const handleOnChangeFor = (name) => (value) =>
    updateGlobalState((prevState) => ({
      ...prevState,
      ['headingSection']: {
        ...prevState['headingSection'],
        [name]: value,
      },
    }));

  const handlePreSurgicalDiagnosticDebounced = useDebouncedCallback(
    handleOnChangeFor('preSurgicalDiagnostic'),
    250,
    { trailing: true }
  );

  const handleProposedSurgeonDebounced = useDebouncedCallback(
    handleOnChangeFor('proposedSurgeon'),
    250,
    { trailing: true }
  );

  return [
    initialState,
    {
      handlePreSurgicalDiagnosticDebounced,
      handleProposedSurgeonDebounced,
    },
  ];
};

export default useForm;
