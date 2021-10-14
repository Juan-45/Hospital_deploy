import { View } from '@react-pdf/renderer';
import TableColumnPDF from 'PDF/layout/TableColumnPDF';
import TableRowPDF from 'PDF/layout/TableRowPDF';

import styles from './medicalStudyItemPDF/styles.js';

const MedicalStudyItemPDF = ({ valuesObj }) => {
  const { label, date, result, unit, observations } = valuesObj;
  const resultValue = result !== '' ? `${result} ${unit ? unit : ''}` : '';
  return (
    <View style={styles.rootContainer} wrap={false}>
      <View style={styles.firstSectionContainer}>
        <TableColumnPDF
          headerText="Estudio"
          bodyText={label}
          rootContainerStyle={styles.firstColumnTable}
        />
        <TableColumnPDF
          headerText="Fecha"
          bodyText={date}
          rootContainerStyle={styles.secondColumnsTable}
        />
      </View>
      <TableRowPDF headerText="Resultado" bodyText={resultValue} />
      <TableRowPDF headerText="Observaciones" bodyText={observations} />
    </View>
  );
};

export default MedicalStudyItemPDF;
