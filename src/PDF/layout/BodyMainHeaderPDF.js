import { Text, View } from '@react-pdf/renderer';

import styles from './bodyMainHeaderPDF/styles';

const BodyMainHeaderPDF = ({ text }) => (
  <View style={styles.bodyMainHeaderContainers}>
    <Text style={styles.bodyMainHeaderText}>{text}</Text>
  </View>
);

export default BodyMainHeaderPDF;
