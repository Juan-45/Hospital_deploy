import { PreSurgical } from 'context/PreSurgical';
import { useContext } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const useForm = () => {
  const { initialState, updateGlobalState } = useContext(PreSurgical);

  const { bottomSection } = initialState;

  const handleOnChangeFor = (name) => (value) =>
    updateGlobalState((prevState) => ({
      ...prevState,
      bottomSection: {
        ...prevState['bottomSection'],
        [name]: value,
      },
    }));

  const handlePsychicStateDebounced = useDebouncedCallback(handleOnChangeFor('psychicState'), 250, {
    trailing: true,
  });
  const handlePsychicStateObservationDebounced = useDebouncedCallback(
    handleOnChangeFor('psychicStateObservation'),
    250,
    {
      trailing: true,
    }
  );
  const handleAnestheticPlanDebounced = useDebouncedCallback(
    handleOnChangeFor('anestheticPlan'),
    250,
    {
      trailing: true,
    }
  );
  const handleAnestheticPlanObservationDebounced = useDebouncedCallback(
    handleOnChangeFor('anestheticPlanObservation'),
    250,
    {
      trailing: true,
    }
  );
  const handleBloodSampleRequestDebounced = useDebouncedCallback(
    handleOnChangeFor('bloodSampleRequest'),
    250,
    {
      trailing: true,
    }
  );
  const handleICURequestDebounced = useDebouncedCallback(handleOnChangeFor('iCURequest'), 250, {
    trailing: true,
  });

  const handleInterconsultationsDebounced = useDebouncedCallback(
    handleOnChangeFor('interconsultations'),
    250,
    {
      trailing: true,
    }
  );
  const handleExtraObservationsDebounced = useDebouncedCallback(
    handleOnChangeFor('extraObservations'),
    250,
    {
      trailing: true,
    }
  );
  return [
    bottomSection,
    {
      handlePsychicStateDebounced,
      handlePsychicStateObservationDebounced,
      handleAnestheticPlanDebounced,
      handleAnestheticPlanObservationDebounced,
      handleBloodSampleRequestDebounced,
      handleICURequestDebounced,
      handleInterconsultationsDebounced,
      handleExtraObservationsDebounced,
    },
  ];
};
export default useForm;
