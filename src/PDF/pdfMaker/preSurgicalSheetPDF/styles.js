import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingBottom: '18mm',
  },
  bodySection: {
    paddingHorizontal: '25mm',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '3mm',
  },
  headingText: {
    borderBottom: '1mm solid #2DBCB6',
    fontSize: '7mm',
  },
  sectionWithBottomBorder: {
    paddingBottom: '2mm',
    borderBottom: '1pt solid #d8d8d8',
    marginBottom: '2mm',
  },
});

export default styles;
