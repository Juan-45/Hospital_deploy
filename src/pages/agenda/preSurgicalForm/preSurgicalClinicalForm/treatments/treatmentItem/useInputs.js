import { useState } from 'react';

const useInputs = ({ setStateObj, currentDrug }) => {
  const [showModal, setShowModal] = useState(false);

  const { setFormStatePS, setTreatmentsParent } = setStateObj;

  const deleteExistingKeyFromState = (prevState, name) => {
    const stateObj = { ...prevState };
    delete stateObj[name];
    return stateObj;
  };

  const handleDeleteButton = () => {
    setShowModal(true);
  };

  const handleAcceptButtonFor = (currentDrugName) => () => {
    setTreatmentsParent((prevState) => deleteExistingKeyFromState(prevState, currentDrugName));
    setFormStatePS((prevState) => deleteExistingKeyFromState(prevState, currentDrugName));
    setShowModal(false);
  };

  const handleAcceptButton = handleAcceptButtonFor(currentDrug);

  const handleCancelButton = () => {
    setShowModal(false);
  };
  return [
    showModal,
    {
      handleDeleteButton,
      handleAcceptButton,
      handleCancelButton,
    },
  ];
};

export default useInputs;
