import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: '4mm',
    flexWrap: 'nowrap',
  },
  firstColumnTable: {
    width: '80mm',
  },
  firstSectionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: '32mm',
  },

  remainingColumnsTable: {
    width: '24mm',
  },
});

export default styles;
