import Grid from '@material-ui/core/Grid';
import PDFMaker from 'PDF/PDFMaker';
import clsx from 'clsx';
import StandarButton from 'components/StandarButton';
import StandarDateInput from 'components/StandarDateInput';
import { PreSurgical } from 'context/PreSurgical';

import BottomSection from './preSurgicalForm/BottomSection';
import HeaderSectionPS from './preSurgicalForm/HeaderSectionPS';
import PhysicalExamForm from './preSurgicalForm/PhysicalExamForm';
import PresurgicalClinicalForm from './preSurgicalForm/PreSurgicalClinicalForm';
import PreSurgicalFormModal from './preSurgicalForm/PreSurgicalFormModal';
import ValidationMessagesList from './preSurgicalForm/ValidationMessagesList';
import useForm from './preSurgicalForm/useForm';
import useStyles from './preSurgicalForm/useStyles';
//
//TODO if the user exit this page without saving the form show modal
/*NOTE: with server request in case of a loaded patient with its PreSurgical form incomplete, the server should return a
state with the current data of the form that will be pass as an inicialized state*/

//TAKE INTO ACCOUNT having shouldDisplay here it will be useful for the cases where
//there is a semi completed preSurgical form returned by the server, so, for the
//fields where there is selected data, those field must be rendered open.
const PreSurgicalForm = () => {
  const classes = useStyles();
  const [
    {
      contextObject,
      isPreviewClicked,
      isRequiredErrorHeaderSection,
      isRequiredBottomSection,
      isTreatmentsUnresolved,
      formDataWasSended,
      formDataWasSendedAsCompleted,
      preSurgicalFormPDFData,
      downloadButtonRef,
      headerSectionRef,
      physicalExamRef,
      physicalExamIsUnresolved,
      physicalExamFormIsRequired,
      validationMessagesArr,
      conditionsGroupForModal,
      staticTextsGroup,
      classNamesGroup,
      refsGroupForPDFMaker,
      maxDateProp,
      dateState,
      isRequiredDateAndTime,
      medicalStudiesRequired,
      isTreatmentsUnresolvedRef,
      currentPatient,
      pDFFileUrlRef,
    },
    {
      validateFormOnClick,
      handleSubmittForm,
      handleDateTimeDebounce,
      setStatesGroupForModal,
      setIsPreviewClicked,
    },
  ] = useForm();

  return (
    <Grid container direction="column" justifyContent="flex-start" className={classes.root}>
      <PreSurgicalFormModal
        handleSubmittForm={handleSubmittForm}
        setStatesGroup={setStatesGroupForModal}
        conditionsGroup={conditionsGroupForModal}
        dynamicText={medicalStudiesRequired}
        staticTextsGroup={staticTextsGroup}
        classNamesGroup={classNamesGroup}
      />
      <PreSurgical.Provider value={contextObject}>
        <HeaderSectionPS
          className={classes.rowBottomMargin}
          isRequiredError={isRequiredErrorHeaderSection}
          ref={headerSectionRef}
        />
        <PresurgicalClinicalForm
          className={classes.rowBottomMargin}
          isTreatmentsUnresolved={isTreatmentsUnresolved}
          ref={isTreatmentsUnresolvedRef}
        />
        <PhysicalExamForm
          className={classes.rowBottomMargin}
          isRequiredError={physicalExamFormIsRequired}
          ref={physicalExamRef}
          isUnresolved={physicalExamIsUnresolved}
        />
        <BottomSection
          className={classes.doubleRowBottomMargin}
          isRequiredError={isRequiredBottomSection}
        />
      </PreSurgical.Provider>
      <Grid container direction="column" alignItems="flex-start">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={clsx(classes.rowBottomMargin, classes.bottomLine)}
          wrap="nowrap"
        >
          <StandarButton
            text="Descargar PDF"
            download={`Ficha Pre-Quirurgica_${currentPatient.lastName} ${
              currentPatient.firstName
            }_${preSurgicalFormPDFData ? preSurgicalFormPDFData.date : ''}`}
            href={'default'}
            disabled={!formDataWasSended}
            onClick={() => {
              downloadButtonRef.current.setAttribute('href', pDFFileUrlRef.current);
              return true;
            }}
            ref={(e) => (downloadButtonRef.current = e)}
          />
          <Grid container justifyContent="flex-end">
            <StandarDateInput
              label={
                dateState != 'Invalid Date' && dateState !== null
                  ? dateState
                      .toLocaleString('en-US', { hour: 'numeric', hour12: true })
                      .match(/(AM)|(PM)/)[0]
                  : ''
              }
              format="dd/MM/yyyy  hh:mm"
              value={dateState}
              onChange={handleDateTimeDebounce}
              maxDate={maxDateProp.current}
              maxDateMessage="La fecha no puede ser mayor a la actual"
              isRequiredError={isRequiredDateAndTime}
              className={clsx(classes.rightMargin, classes.dateInputLabel)}
            />
            <StandarButton
              text="Validar"
              onClick={validateFormOnClick}
              disabled={formDataWasSendedAsCompleted}
            />
          </Grid>
        </Grid>
        <ValidationMessagesList
          validationMessagesArr={validationMessagesArr}
          className={classes.rowBottomMargin}
        />
        <PDFMaker
          data={preSurgicalFormPDFData}
          renderInWindowSetState={setIsPreviewClicked}
          renderInWindowState={isPreviewClicked}
          ref={refsGroupForPDFMaker}
        />
      </Grid>
    </Grid>
  );
};

export default PreSurgicalForm;
