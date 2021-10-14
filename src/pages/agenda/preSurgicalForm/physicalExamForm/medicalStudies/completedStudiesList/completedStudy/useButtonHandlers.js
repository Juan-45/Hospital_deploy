import { useState } from 'react';

const useButtonHandlers = (setStateObj, key) => {
  const [showModal, setShowModal] = useState(false);

  const { updateGlobalState, setCompletedStudiesParent } = setStateObj;
  const deleteExistingKeyFromState = (prevState, currentName) => {
    const stateObj = { ...prevState };
    delete stateObj[currentName];
    return stateObj;
  };

  const handleOnClickDeleteButton = () => {
    setShowModal(true);
  };

  const handleAcceptButtonFor = (currentKey) => () => {
    updateGlobalState((prevState) => deleteExistingKeyFromState(prevState, currentKey));
    setCompletedStudiesParent((prevState) => deleteExistingKeyFromState(prevState, currentKey));
    setShowModal(false);
  };
  const handleAcceptButton = handleAcceptButtonFor(key);

  const handleCancelButton = () => {
    setShowModal(false);
  };

  return [
    showModal,
    {
      handleOnClickDeleteButton,
      handleAcceptButton,
      handleCancelButton,
    },
  ];
};

export default useButtonHandlers;
