import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  header: {
    height: '100%',
    padding: '1mm',
    fontSize: '4mm',
    width: '32mm',
    border: '1pt solid #606e7b',
    backgroundColor: '#9dc3c2',
  },
  text: {
    fontSize: '4mm',
  },
  textContainer: {
    height: '100%',
    width: '128mm',
    padding: '1mm',
    border: '1pt solid #606e7b',
  },
});

export default styles;
