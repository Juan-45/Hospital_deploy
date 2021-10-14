import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  footerSection: {
    backgroundColor: '#b6c7d1',
    borderTop: '2mm solid #2DBCB6',
    position: 'absolute',
    bottom: '0mm',
    width: '100%',
    height: '13mm',
  },
  footerSectionText: {
    position: 'absolute',
    top: '3mm',
    right: '25mm',
    fontSize: '4mm',
    fontFamily: 'Helvetica-Oblique',
  },
});

export default styles;
