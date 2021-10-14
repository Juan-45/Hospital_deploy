import { Text, View } from '@react-pdf/renderer';

import styles from './preSurgicalClinicalItemBodyPDF/styles';

const PreSurgicalClinicalItemBodyPDF = ({ valuesObj }) => {
  const { observations, conditions } = valuesObj;
  const conditionsString = conditions.join(' - ');
  return (
    <View>
      {conditions.length !== 0 ? (
        <View style={styles.rowContainer}>
          <Text style={styles.rowHeaderText}>Condiciones:</Text>
          <Text style={styles.bodyText}>{conditionsString}</Text>
        </View>
      ) : null}
      {observations !== '' ? (
        <View style={styles.rowContainer}>
          <Text style={styles.rowHeaderText}>Observaciones:</Text>
          <Text style={styles.bodyText}>{observations}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default PreSurgicalClinicalItemBodyPDF;
