import { View } from '@react-pdf/renderer';
import TableColumnPDF from 'PDF/layout/TableColumnPDF';
import TableRowPDF from 'PDF/layout/TableRowPDF';

import styles from './treatmentItemPDF/styles';

const TreatmentItemPDF = ({ valuesObj }) => {
  const { drug, startingTreatmentDate, endingTreatmentDate, observations } = valuesObj;
  return (
    <View style={styles.rootContainer} wrap={false}>
      <View style={styles.firstSectionContainer}>
        <TableColumnPDF
          headerText="Medicación"
          bodyText={drug}
          rootContainerStyle={styles.firstColumnTable}
        />
        <TableColumnPDF
          headerText="Desde"
          bodyText={startingTreatmentDate}
          rootContainerStyle={styles.remainingColumnsTable}
        />
        <TableColumnPDF
          headerText="Hasta"
          bodyText={endingTreatmentDate}
          rootContainerStyle={styles.remainingColumnsTable}
        />
      </View>
      <TableRowPDF headerText="Observaciones" bodyText={observations} />
    </View>
  );
};

export default TreatmentItemPDF;
