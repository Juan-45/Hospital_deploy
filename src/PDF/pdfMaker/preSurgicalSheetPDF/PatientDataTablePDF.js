import { View } from '@react-pdf/renderer';
import BodySubSectionHeaderPDF from 'PDF/layout/BodySubSectionHeaderPDF';

import SimpleTableRow from './SimpleTableRow';
import styles from './patientDataTablePDF/styles';

const PatientDataTable = ({ currentPatientData }) => {
  const { lastName, firstName, iDNumber, gender, age } = currentPatientData;

  return (
    <View style={styles.sectionWithOutBorder}>
      <BodySubSectionHeaderPDF text="Paciente:" />
      <SimpleTableRow headerText="Apellido:" text={lastName} />
      <SimpleTableRow headerText="Nombre:" text={firstName} />
      <SimpleTableRow headerText="DNI:" text={iDNumber} />
      <SimpleTableRow
        headerText="Género:"
        text={`${gender === 'male' ? 'Masculino' : 'Femenino'}`}
      />
      <SimpleTableRow headerText="Edad:" text={`${age} años`} />
    </View>
  );
};
export default PatientDataTable;
