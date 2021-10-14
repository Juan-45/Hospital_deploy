import { Page, Text, View, Document } from '@react-pdf/renderer';
import React from 'react';

import AirwayExamSectionPDF from './preSurgicalSheetPDF/AirwayExamSectionPDF';
import BottomSectionPDF from './preSurgicalSheetPDF/BottomSectionPDF';
import FooterSectionPDF from './preSurgicalSheetPDF/FooterSectionPDF';
import HeaderSectionPDF from './preSurgicalSheetPDF/HeaderSectionPDF';
import PatientDataTable from './preSurgicalSheetPDF/PatientDataTablePDF';
import PhysicalExamSectionPDF from './preSurgicalSheetPDF/PhysicalExamSectionPDF';
import PreSurgicalClinicalSectionPDF from './preSurgicalSheetPDF/PreSurgicalClinicalSectionPDF';
import SingleLineTextItem from './preSurgicalSheetPDF/SingleLineTextItem';
import MedicalStudiesListPDF from './preSurgicalSheetPDF/preSurgicalItemPDF/MedicalStudiesListPDF';
import styles from './preSurgicalSheetPDF/styles';

const PreSurgicalSheetPDF = ({ formData }) => {
  const shallowValueObtainer = (obj, shallowKey) => {
    if (obj[shallowKey]) {
      return obj[shallowKey];
    } else return {};
  };
  const nestedValueObtainer = (obj, shallowKey, nestedKey) => {
    if (obj[shallowKey]) {
      return obj[shallowKey][nestedKey];
    }
  };
  const preSurgicalClinicalValues = {
    preSurgicalClinicalConditions: {
      ...shallowValueObtainer(formData, 'conditionsWithCheckboxes'),
      ...shallowValueObtainer(formData, 'conditionWithOutCheckboxes'),
    },
    treatments: formData['treatments'] ? formData['treatments'] : [],
  };
  const medicalStudiesValues = formData['medicalStudies'] ? formData['medicalStudies'] : [];
  const statusValue = formData['status']
    ? formData['status'] === 'completed'
      ? 'Completado'
      : 'Incompleto'
    : '';
  const physicalExamValues = shallowValueObtainer(formData, 'physicalExams');
  const airwayExamValues = shallowValueObtainer(formData, 'airwayExams');
  const preSurgicalBottomSectionValues = shallowValueObtainer(formData, 'bottomSection');
  const patientLastName = nestedValueObtainer(formData, 'currentPatient', 'lastName');
  const patientFirstName = nestedValueObtainer(formData, 'currentPatient', 'firstName');
  const preSurgicalDiagnostic = nestedValueObtainer(
    formData,
    'headingSection',
    'preSurgicalDiagnostic'
  );
  const proposedSurgeon = nestedValueObtainer(formData, 'headingSection', 'proposedSurgeon');

  const date = formData ? formData.date : '';

  return (
    <Document
      title={`Ficha Pre-Quirurgica_${patientLastName} ${patientFirstName}_${date}`}
      author="usuario"
      subject="Planilla Pre-Quirúrgica"
      pdfVersion="1.7"
    >
      <Page size="A4" style={styles.page} wrap>
        <HeaderSectionPDF />
        <FooterSectionPDF />
        <View style={styles.bodySection}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Ficha Pre-Anestésica</Text>
          </View>
          <SingleLineTextItem title="Estado" text={statusValue} />
          <SingleLineTextItem title="Fecha y Hora" text={date} />
          {formData['currentPatient'] ? (
            <PatientDataTable currentPatientData={formData['currentPatient']} />
          ) : null}

          <SingleLineTextItem title="Diagnóstico Pre-Operatorio:" text={preSurgicalDiagnostic} />
          <SingleLineTextItem title="Cirugía Propuesta:" text={proposedSurgeon} />
          <PreSurgicalClinicalSectionPDF valuesObj={preSurgicalClinicalValues} />
          <PhysicalExamSectionPDF valuesObj={physicalExamValues} />
          <AirwayExamSectionPDF valuesObj={airwayExamValues} />
          <MedicalStudiesListPDF valuesArr={medicalStudiesValues} />
          <BottomSectionPDF valuesObj={preSurgicalBottomSectionValues} />
        </View>
      </Page>
    </Document>
  );
};

export default PreSurgicalSheetPDF;
