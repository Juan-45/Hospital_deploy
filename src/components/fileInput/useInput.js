import { useState } from 'react';

const useInput = (maxSize, ref, nestedHandler) => {
  const [fileObjState, setFileObj] = useState();
  const [errorState, setErrorState] = useState();
  const [helperText, setHelperText] = useState();

  const setErrorRefTo = (bool, refProp) => refProp && (refProp.current = bool);

  const removeErrorState = (refProp) => {
    setHelperText(null);
    setErrorState(false);
    setErrorRefTo(false, refProp);
  };

  const checkIfFileTypeIsInvalid = (inputValue, key) => {
    const fileType = inputValue[key]['type'].split('/')[1];
    const isFileTypeInvalid =
      (fileType !== 'jpeg' && fileType !== 'jpg' && fileType !== 'png') || fileType === undefined;
    if (isFileTypeInvalid) {
      return true;
    }
  };
  const checkIfFileIsExceedingSize = (inputValue, key, maxSizeProp) => {
    const fileSize = inputValue[key]['size'];
    const maxSizeInBytes = maxSizeProp * 1000000;
    const isExceedingSize = fileSize > maxSizeInBytes;
    if (isExceedingSize) {
      return true;
    }
  };

  const setInvalidFileTypeError = (refProp) => {
    setErrorState(true);
    setHelperText('Formato de archivo inválido, solo se acepta .jpeg, .jpg o .png');
    setErrorRefTo(true, refProp);
  };

  const setFileExceedingSizeError = (refProp, maxSizeProp) => {
    setErrorState(true);
    setHelperText(`El límite de tamaño por archivo es de ${maxSizeProp}MB`);
    setErrorRefTo(true, refProp);
  };

  const manageValidation = (maxSizeProp, refProp) => (event) => {
    const currentInputValue = event.target.files;
    let isFileTypeInvalid;
    let isExceedingSize;
    for (const key in currentInputValue) {
      const isAFileKey = Number.isInteger(Number(key));
      if (isAFileKey) {
        isFileTypeInvalid = checkIfFileTypeIsInvalid(currentInputValue, key);
        isExceedingSize = checkIfFileIsExceedingSize(currentInputValue, key, maxSizeProp);
      }
    }
    if (isFileTypeInvalid) {
      setInvalidFileTypeError(refProp);
    } else if (isExceedingSize) {
      setFileExceedingSizeError(refProp, maxSizeProp);
    } else {
      removeErrorState(refProp);
    }
    nestedHandler(event.target.files);
    setFileObj(event.target.files);
  };

  const handleOnChange = manageValidation(maxSize, ref);

  return [{ fileObjState, helperText, errorState }, handleOnChange];
};

export default useInput;
