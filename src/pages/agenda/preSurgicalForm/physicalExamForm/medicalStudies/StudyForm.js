import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import clsx from 'clsx';
import FileInput from 'components/FileInput';
import FormAddedItem from 'components/FormAddedItem';
import FormHeading from 'components/FormHeading';
import IconButton from 'components/IconButton';
import PreSurgicalModalChildren from 'components/PreSurgicalFormChildrenModal';
import StandarButton from 'components/StandarButton';
import StandarModal from 'components/StandarModal';
import TitledDateInput from 'components/TitledDateInput';
import TitledInputWithUnit from 'components/TitledInputWithUnit';
import TitledItem from 'components/TitledItem';
import TitledTextAreaAutoSize from 'components/TitledTextAreaAutoSize';
import React from 'react';

import useForm from './studyForm/useForm';
import useStyles from './studyForm/useStyles';

//TODO for case === 'image' the file must be upload to the server
const StudyForm = ({ className, formProps, setStateObj, currentFormValuesStorage }) => {
  const classes = useStyles();
  const [
    formErrors,
    result,
    modalState,
    imageFiles,
    resultDate,
    observations,
    isResultInputInErrorRef,
    isImageFilesInputInErrorRef,
    {
      setImageFiles,
      handleResultDebounced,
      handleResultDateDebounced,
      handleObservationDebounced,
      handleOnClose,
      handleDelete,
      handleAcceptButton,
      handleCancelButton,
      handleOnAdd,
    },
  ] = useForm(formProps, setStateObj, currentFormValuesStorage);
  const { resultRequired, resultDateRequired } = formErrors;
  const { title } = formProps;

  const setRemainingInput = () => {
    const resultTextArea = [
      <TitledTextAreaAutoSize
        key="result"
        title="Resultado:"
        placeholder="/..Resultado..."
        className={classes.rowBottomMargin}
        value={result}
        nestedHandler={handleResultDebounced}
        isRequiredError={resultRequired}
        classNameTextArea={classes.textArea}
      />,
    ];
    const toRenderArr = [];
    switch (formProps['type']) {
      case 'numerical':
        toRenderArr.push(
          <TitledInputWithUnit
            key="numericalResult"
            title="Resultado:"
            className={classes.rowBottomMargin}
            inputWidthClassName={classes.resultInput}
            value={result}
            placeholder="Resultado"
            nestedHandler={handleResultDebounced}
            isRequiredError={resultRequired}
            inputProps={{ max: 10000000, decimalplaces: 1 }}
            ref={isResultInputInErrorRef}
          />
        );
        break;
      case 'textual':
        toRenderArr.push(resultTextArea);
        break;
      case 'image':
        toRenderArr.push(resultTextArea);
        toRenderArr.push(
          <Grid container item xs={12} sm={6} key="imageFileInput">
            <FileInput
              className={clsx(classes.rowBottomMargin, classes.imageInput)}
              files={imageFiles} //TODO make a controllable component, native input type file doesn't allow to modify its files attribute https://medium.com/trabe/controlled-file-input-components-in-react-3f0d42f901b8
              nestedHandler={(files) => setImageFiles(files)}
              maxSize={10}
              ref={isImageFilesInputInErrorRef}
            />
          </Grid>
        );
    }
    return toRenderArr;
  };

  return (
    <FormAddedItem className={className}>
      <StandarModal openState={modalState.show}>
        <PreSurgicalModalChildren
          text={modalState.text}
          handleAcceptButton={handleAcceptButton}
          handleCancelButton={handleCancelButton}
        />
      </StandarModal>
      <Grid
        container
        alignItems="flex-start"
        justifyContent="space-between"
        wrap="nowrap"
        className={classes.addedItemTextContainer}
      >
        <Grid container direction="column" alignItems="flex-start">
          <Grid container justifyContent="space-between" alignItems="flex-start" wrap="nowrap">
            <FormHeading
              variant="body1"
              className={clsx(classes.textMark, classes.rowBottomMargin)}
              text={`Estudio: ${title}`}
            />
            <IconButton size="medium" startIcon={<CloseIcon />} onClick={handleOnClose} />
          </Grid>
          <Grid container>{setRemainingInput()}</Grid>
          <TitledDateInput
            inputTitle="Fecha:"
            format="dd/MM/yyyy"
            value={resultDate}
            nestedHandler={handleResultDateDebounced}
            className={classes.rowBottomMargin}
            isRequiredError={resultDateRequired}
          />
          <TitledTextAreaAutoSize
            title="Observaciones:"
            textareaname="observations"
            placeholder="/..Observaciones..."
            className={classes.rowBottomMargin}
            value={observations}
            nestedHandler={handleObservationDebounced}
            classNameTextArea={classes.textArea}
          />
          {formProps['description'] !== '' && (
            <TitledItem title="Descripción:" className={classes.rowBottomMargin}>
              <Typography variant="body2" align="left">
                {formProps['description']}
              </Typography>
            </TitledItem>
          )}
        </Grid>
      </Grid>
      <Grid className={classes.rowContainerBottomLine} />
      <Grid container alignItems="center" justifyContent="space-between">
        <IconButton size="medium" startIcon={<DeleteForeverIcon />} onClick={handleDelete} />
        <StandarButton
          className={classes.textButton}
          text="AGREGAR ESTUDIO"
          onClick={handleOnAdd}
        />
      </Grid>
    </FormAddedItem>
  );
};

export default React.memo(StudyForm);
