import { Text, View } from '@react-pdf/renderer';

import styles from './simpleTableRow/styles';

const SimpleTableRow = ({ headerText, text }) => (
  <View style={styles.tableRow}>
    <Text style={styles.rowHeaderText}>{headerText}</Text>
    <Text style={styles.bodyText}>{text}</Text>
  </View>
);

export default SimpleTableRow;
