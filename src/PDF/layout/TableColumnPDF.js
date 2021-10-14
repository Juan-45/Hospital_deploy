import { Text, View } from '@react-pdf/renderer';

import styles from './tableColumnPDF/styles';

const TableColumnPDF = ({ headerText, bodyText, rootContainerStyle, textStyle }) => (
  <View style={{ ...styles.rootContainer, ...rootContainerStyle }}>
    <View style={styles.headerColumnCells}>
      <Text style={{ ...styles.columnHeaderText, ...textStyle }}>{`${headerText}:`}</Text>
    </View>
    {bodyText !== '' ? (
      <Text style={{ ...styles.bodyText, ...textStyle }}>{bodyText}</Text>
    ) : (
      <Text style={styles.bodyText}>N/D</Text>
    )}
  </View>
);
export default TableColumnPDF;
