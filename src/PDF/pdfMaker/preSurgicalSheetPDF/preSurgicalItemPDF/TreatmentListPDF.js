import { Text, View } from '@react-pdf/renderer';
import BodyMainHeaderPDF from 'PDF/layout/BodyMainHeaderPDF';

import TreatmentItemPDF from './treatmentListPDF/TreatmentItemPDF';
import styles from './treatmentListPDF/styles';

const TreatmenstListPDF = ({ valuesArr }) => {
  const isDataAvailable = valuesArr.length === 0 ? false : true;
  let itemsToRender;
  if (isDataAvailable) {
    itemsToRender = valuesArr.map((item) => (
      <TreatmentItemPDF key={item['drug']} valuesObj={item} />
    ));
  }

  return (
    <View style={styles.rootContainer}>
      <BodyMainHeaderPDF text="Tratamientos" />
      {isDataAvailable ? itemsToRender : <Text style={styles.bodyText}>No.</Text>}
    </View>
  );
};

export default TreatmenstListPDF;
