import { Text, View } from '@react-pdf/renderer';

import styles from './tableRowPDF/styles';

const TableRowPDF = ({ headerText, bodyText, rootContainer }) => (
  <View style={{ ...styles.rootContainer, ...rootContainer }} wrap={false}>
    <Text style={styles.header}>{`${headerText}:`}</Text>
    <View style={styles.textContainer}>
      {bodyText !== '' ? (
        <Text style={styles.text}>{bodyText}</Text>
      ) : (
        <Text style={styles.text}>N/D</Text>
      )}
    </View>
  </View>
);

export default TableRowPDF;
