import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  tableRow: {
    paddingVertical: '1mm',
    flexDirection: 'row',
    borderBottom: '1pt solid #d8d8d8',
  },
  rowHeaderText: {
    fontSize: '4mm',
    width: '22mm',
  },
  bodyText: {
    fontSize: '4mm',
  },
});

export default styles;
