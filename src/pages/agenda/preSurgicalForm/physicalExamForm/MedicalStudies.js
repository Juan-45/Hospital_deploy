import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import FormItemsWithSwitch from 'components/FormItemsWithSwitch';
import PreSurgicalFormChildrenModal from 'components/PreSurgicalFormChildrenModal';
import StandarCheckboxesGroup from 'components/StandarCheckboxesGroup';
import StandarModal from 'components/StandarModal';
import StandarPagination from 'components/StandarPagination';
import React from 'react';

import CompletedStudyList from './medicalStudies/CompletedStudiesList';
import NewStudyForm from './medicalStudies/NewStudyForm';
import StudyForm from './medicalStudies/StudyForm';
import useForm from './medicalStudies/useForm';
import useStyles from './medicalStudies/useStyles';

//TODO try render prop component for standarPagination
const MedicalStudies = ({ isUnresolvedError, className }, ref) => {
  const classes = useStyles();

  const [
    {
      studiesCheckboxes,
      studiesCheckboxesArr,
      storageOfStudyFormValues,
      studiesFormProps,
      page,
      isUnresolved,
      shouldRender,
      modalState,
      studyCount,
      completedStudiesPropsArr,
    },
    {
      handleSwitch,
      handleAcceptButton,
      handleCancelButton,
      handleCheckboxes,
      handlePaginationOnChange,
      createArrFromObject,
      setStateObjStudyForm,
      setStateObjNewStudy,
      setStateObjCompletedStudy,
    },
  ] = useForm(ref, isUnresolvedError);

  const studiesFormPropsArr = createArrFromObject(studiesFormProps);

  const studyFormToShow = [];
  if (studiesFormPropsArr.length === 1) {
    const currentProps = studiesFormPropsArr[0];
    const { name } = currentProps;
    studyFormToShow.push(
      <StudyForm
        key={name}
        className={classes.rowBottomMargin}
        formProps={currentProps}
        setStateObj={setStateObjStudyForm}
        currentFormValuesStorage={storageOfStudyFormValues[name]}
      />
    );
  } else if (studiesFormPropsArr.length > 1) {
    const currentProps = studiesFormPropsArr[page - 1];
    const { name } = currentProps;
    studyFormToShow.push(
      <StudyForm
        key={name}
        className={classes.rowBottomMargin}
        formProps={currentProps}
        setStateObj={setStateObjStudyForm}
        currentFormValuesStorage={storageOfStudyFormValues[name]}
      />
    );
  }
  return (
    <FormItemsWithSwitch
      groupTitle="Estudios:"
      className={className}
      switchState={shouldRender}
      handleSwitch={handleSwitch}
    >
      <StandarModal openState={modalState.show}>
        <PreSurgicalFormChildrenModal
          text={modalState.text}
          handleAcceptButton={handleAcceptButton}
          handleCancelButton={handleCancelButton}
        />
      </StandarModal>
      <Grid
        container
        direction="column"
        className={isUnresolved ? classes.isUnresolvedError : null}
      >
        <StandarCheckboxesGroup
          checkboxesArr={studiesCheckboxesArr}
          nestedHandler={handleCheckboxes}
          checkboxesState={studiesCheckboxes}
          className={classes.checkBoxesGroup}
          noWrap
        />
        <NewStudyForm
          className={studyCount >= 1 ? classes.rowBottomMargin : null}
          setStateObj={setStateObjNewStudy}
        />
        {studyFormToShow}
        {studyCount > 1 && (
          <StandarPagination
            count={studyCount}
            page={page}
            color="primary"
            showFirstButton
            showLastButton
            size="small"
            onChange={handlePaginationOnChange}
          />
        )}
      </Grid>
      {isUnresolved && (
        <Typography
          variant="caption"
          className={clsx(
            classes.textError,
            completedStudiesPropsArr.length > 1 && classes.rowBottomMargin
          )}
        >
          Hay formularios abiertos, complételos o ciérrelos, puede hacer esto clickeando el botón X
          en la esquina superior derecha del recuadro del formulario de Estudio, o deseleccionando
          los checkboxes del listado de Estudios, luego vuelva a intentar la validación.
        </Typography>
      )}

      {completedStudiesPropsArr.length >= 1 && (
        <CompletedStudyList
          itemsToRenderProps={completedStudiesPropsArr}
          className={!isUnresolved ? classes.rowTopMargin : null}
          setStateObj={setStateObjCompletedStudy}
        />
      )}
    </FormItemsWithSwitch>
  );
};

export default React.forwardRef(MedicalStudies);
