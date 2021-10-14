import { View } from '@react-pdf/renderer';
import BodyMainHeaderPDF from 'PDF/layout/BodyMainHeaderPDF';
import TableColumnPDF from 'PDF/layout/TableColumnPDF';
import TableRowPDF from 'PDF/layout/TableRowPDF';

import styles from './airwayExamSectionPDF/styles';

const AirwayExamSectionPDF = ({ valuesObj }) => {
  const {
    mouthOpening,
    malampati,
    thyromentalDistance,
    goniomentalDistance,
    neckMovement,
    teeth,
    difficultAirwayForetell,
    observations,
  } = valuesObj;

  const teethValue = teeth === 'complete' ? 'Completa' : 'Incompleta';
  const difficultAirwayForetellValue = difficultAirwayForetell === 'yes' ? 'Sí' : 'No';

  return (
    <View wrap={false}>
      <BodyMainHeaderPDF text="Exámen Vía Aérea." />
      <View style={styles.mainBody}>
        <View style={styles.tableContainer}>
          <TableColumnPDF headerText="Ap. Bucal" bodyText={mouthOpening} />
          <TableColumnPDF headerText="Malampati" bodyText={malampati} />
          <TableColumnPDF headerText="Dist. Tiroment." bodyText={thyromentalDistance} />
          <TableColumnPDF headerText="Dist. Gonioment." bodyText={goniomentalDistance} />
          <TableColumnPDF headerText="Mov. Cuello" bodyText={neckMovement} />
          <TableColumnPDF headerText="Dentadura" bodyText={teethValue} />
        </View>
        <View style={styles.tableContainer}>
          <TableColumnPDF
            headerText="Prev. Vía Aérea Dificil"
            bodyText={difficultAirwayForetellValue}
            textStyle={difficultAirwayForetell === 'yes' ? styles.alertTextColor : undefined}
          />
        </View>
      </View>
      <TableRowPDF
        headerText="Observaciones"
        bodyText={observations}
        rootContainer={styles.rowTableContainer}
      />
    </View>
  );
};

export default AirwayExamSectionPDF;
