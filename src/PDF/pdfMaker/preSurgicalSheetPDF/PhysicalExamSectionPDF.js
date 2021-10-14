import { View } from '@react-pdf/renderer';
import BodyMainHeaderPDF from 'PDF/layout/BodyMainHeaderPDF';
import TableColumnPDF from 'PDF/layout/TableColumnPDF';
import TableRowPDF from 'PDF/layout/TableRowPDF';

import styles from './physicalExamSectionPDF/styles';

const PhysicalExamSectionPDF = ({ valuesObj }) => {
  const {
    cardiacAuscultation,
    pulmonaryAuscultation,
    spine,
    diastolicPressure,
    systolicPressure,
    pulse,
    asaLevel,
    painLevel,
    weight,
    height,
    vTFactor,
    observations,
    bMIndex,
    bMI,
    bMIC,
    tV,
    bloodType,
    factorRh,
  } = valuesObj;

  const bloodTypeValue = bloodType !== '' ? `${bloodType} - ${factorRh}` : '';
  const bloodPresureValue =
    systolicPressure !== '' ? `${systolicPressure}/${diastolicPressure}` : '';

  return (
    <View wrap={false}>
      <BodyMainHeaderPDF text="Exámen Físico." />
      <View style={styles.mainBody}>
        <View style={styles.tableContainer}>
          <TableColumnPDF headerText="Peso (Kg)" bodyText={weight} />
          <TableColumnPDF headerText="Altura (Cm)" bodyText={height} />
          <TableColumnPDF headerText="Factor VT (Ml/kg)" bodyText={vTFactor} />
          <TableColumnPDF headerText="IMC (Kg/M2)" bodyText={bMIndex} />
          <TableColumnPDF headerText="PI (Kg)" bodyText={bMI} />
          <TableColumnPDF headerText="PIC (Kg)" bodyText={bMIC} />
          <TableColumnPDF headerText="VT (Ml)" bodyText={tV} />
        </View>
        <View style={styles.tableContainer}>
          <TableColumnPDF headerText="Presión Arterial (mmHg)" bodyText={bloodPresureValue} />
          <TableColumnPDF headerText="Pulso (ppm)" bodyText={pulse} />
          <TableColumnPDF headerText="Tipo de Sangre" bodyText={bloodTypeValue} />
          <TableColumnPDF headerText="Grado de Dolor" bodyText={painLevel} />
          <TableColumnPDF headerText="ASA" bodyText={asaLevel} />
        </View>
        <TableRowPDF
          headerText="Auscultación Pulmonar"
          bodyText={pulmonaryAuscultation}
          rootContainer={styles.rowTableContainer}
        />
        <TableRowPDF
          headerText="Auscultación Cardíaca"
          bodyText={cardiacAuscultation}
          rootContainer={styles.rowTableContainer}
        />
        <TableRowPDF
          headerText="Columna Vertebral"
          bodyText={spine}
          rootContainer={styles.rowTableContainer}
        />
      </View>
      <TableRowPDF
        headerText="Observaciones"
        bodyText={observations}
        rootContainer={styles.rowTableContainer}
      />
    </View>
  );
};

export default PhysicalExamSectionPDF;
