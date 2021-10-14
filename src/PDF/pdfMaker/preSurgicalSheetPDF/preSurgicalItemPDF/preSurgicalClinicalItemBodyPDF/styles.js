import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  rowHeaderText: {
    fontSize: '4mm',
    width: '35mm',
  },
  bodyText: {
    fontSize: '4mm',
    width: '125mm',
  },
  rowContainer: {
    paddingVertical: '1mm',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderBottom: '1pt solid #d8d8d8',
  },
});

export default styles;
