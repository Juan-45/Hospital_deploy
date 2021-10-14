import { Text, View } from '@react-pdf/renderer';

import styles from './headerSectionPDF/styles';

const HeaderSectionPDF = () => (
  <View fixed style={styles.headerSection}>
    <Text style={[styles.headerText, { fontSize: '7mm' }]}>
      Hospital San Felipe, Moreno nro. 31.
    </Text>
    <Text style={[styles.headerText, { fontSize: '5mm', marginBottom: '2mm' }]}>
      San Nicolás, provincia de Buenos Aires.
    </Text>
    <Text style={[styles.headerText, { fontSize: '5mm' }]}>Area Cirugía.</Text>
  </View>
);

export default HeaderSectionPDF;
