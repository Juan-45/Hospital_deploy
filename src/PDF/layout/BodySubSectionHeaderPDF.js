import { Text, View } from '@react-pdf/renderer';

import styles from './bodySubSectionHeaderPDF/styles';

const BodySubSectionHeaderPDF = ({ text }) => (
  <View style={styles.bodySubSectionHeaderContainers}>
    <Text style={styles.bodySubSectionHeadersText}>{text}</Text>
  </View>
);
export default BodySubSectionHeaderPDF;
