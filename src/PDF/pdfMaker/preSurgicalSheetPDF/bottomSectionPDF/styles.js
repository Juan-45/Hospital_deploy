import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  columnRootContainer: {
    marginBottom: '4mm',
  },
  anestheticPlanColumnRootContainer: {
    marginBottom: '4mm',
    width: '36mm',
  },
  rowTableContainer: {
    marginBottom: '4mm',
  },
  borderBottom: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottom: '1pt solid #d8d8d8',
    marginBottom: '4mm',
  },
});

export default styles;
