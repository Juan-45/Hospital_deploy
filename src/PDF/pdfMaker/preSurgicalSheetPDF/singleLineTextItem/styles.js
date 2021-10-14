import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  bodyText: {
    fontSize: '4mm',
  },
  sectionWithBottomBorder: {
    paddingBottom: '2mm',
    borderBottom: '1pt solid #d8d8d8',
    marginBottom: '2mm',
  },
});

export default styles;
