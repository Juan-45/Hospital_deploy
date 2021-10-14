import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  headerColumnCells: {
    width: '100%',
    borderBottom: '1pt solid #606e7b',
    backgroundColor: '#9dc3c2',
  },
  columnHeaderText: {
    fontSize: '4mm',
    padding: '1mm',
  },
  bodyText: {
    padding: '1mm',
    paddingLeft: '2mm',
    fontSize: '4mm',
  },
  rootContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    border: '1pt solid #606e7b',
  },
});

export default styles;
