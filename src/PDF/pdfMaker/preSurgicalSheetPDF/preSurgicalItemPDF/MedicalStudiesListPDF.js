import { Text, View } from '@react-pdf/renderer';
import BodyMainHeaderPDF from 'PDF/layout/BodyMainHeaderPDF';

import MedicalStudyItemPDF from './medicalStudiesListPDF/MedicalStudyItemPDF';
import styles from './medicalStudiesListPDF/styles';

const MedicalStudiesListPDF = ({ valuesArr }) => {
  const isDataAvailable = valuesArr.length === 0 ? false : true;
  let itemsToRender;
  if (isDataAvailable) {
    itemsToRender = valuesArr.map((item) => (
      <MedicalStudyItemPDF key={item['name']} valuesObj={item} />
    ));
  }

  return (
    <View style={styles.rootContainer}>
      <BodyMainHeaderPDF text="Estudios Médicos:" />
      {isDataAvailable ? itemsToRender : <Text style={styles.bodyText}>No.</Text>}
    </View>
  );
};

export default MedicalStudiesListPDF;
