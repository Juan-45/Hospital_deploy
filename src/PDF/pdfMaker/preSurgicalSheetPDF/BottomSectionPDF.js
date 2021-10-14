import { View } from '@react-pdf/renderer';
import BodyMainHeaderPDF from 'PDF/layout/BodyMainHeaderPDF';
import TableColumnPDF from 'PDF/layout/TableColumnPDF';
import TableRowPDF from 'PDF/layout/TableRowPDF';

import styles from './bottomSectionPDF/styles';

const BottomSectionPDF = ({ valuesObj }) => {
  const {
    psychicState,
    psychicStateObservation,
    anestheticPlan,
    anestheticPlanObservation,
    bloodSampleRequest,
    iCURequest,
    interconsultations,
    extraObservations,
  } = valuesObj;
  const psychicStateLabels = {
    normal: 'Normal',
    depress: 'Deprimido',
    anxious: 'Ansioso',
    exited: 'Exitado',
    comatose: 'Comatoso',
    hyperemotive: 'Hiperemotivo',
  };
  const anestheticPlanLabels = {
    generalAnesthesia: 'Anestesia General',
    subarachnoid: 'Subaracnoidea',
    peridural: 'Peridural',
    peripheralLock: 'Bloqueo Periférico',
    sedation: 'Sedación',
    combined: 'Combinada',
  };
  const getValue = (key, obj) => {
    if (key !== '') {
      return obj[key];
    } else {
      return '';
    }
  };
  const setNewValue = (string) => (string === 'yes' ? 'Sí' : 'No');
  const bloodSampleRequestValue = setNewValue(bloodSampleRequest);
  const iCURequestValue = setNewValue(iCURequest);
  const psychicStateValue = getValue(psychicState, psychicStateLabels);
  const anestheticPlanValue = getValue(anestheticPlan, anestheticPlanLabels);
  return (
    <View wrap={false}>
      <BodyMainHeaderPDF text="Estado Psíquico Pre-Operatorio." />
      <View style={styles.tableContainer}>
        <TableColumnPDF
          headerText="Estado Psíquico"
          bodyText={psychicStateValue}
          rootContainerStyle={styles.columnRootContainer}
        />
        <TableRowPDF
          headerText="Observaciones"
          bodyText={psychicStateObservation}
          rootContainer={styles.rowTableContainer}
        />
      </View>
      <BodyMainHeaderPDF text="Plán Anestésico Sugerido." />
      <View style={styles.tableContainer}>
        <TableColumnPDF
          headerText="Plán Anestésico"
          bodyText={anestheticPlanValue}
          rootContainerStyle={styles.anestheticPlanColumnRootContainer}
        />
        <TableRowPDF
          headerText="Observaciones"
          bodyText={anestheticPlanObservation}
          rootContainer={styles.rowTableContainer}
        />
      </View>
      <BodyMainHeaderPDF text="Extras." />
      <View style={styles.tableContainer}>
        <View style={styles.borderBottom}>
          <TableColumnPDF
            headerText="Solicitud de Sangre"
            bodyText={bloodSampleRequestValue}
            rootContainerStyle={styles.columnRootContainer}
          />
          <TableColumnPDF
            headerText="Solicitud de UTI"
            bodyText={iCURequestValue}
            rootContainerStyle={styles.columnRootContainer}
          />
          <TableRowPDF
            headerText="Interconsultas"
            bodyText={interconsultations}
            rootContainer={styles.rowTableContainer}
          />
        </View>
        <TableRowPDF
          headerText="Observaciones"
          bodyText={extraObservations}
          rootContainer={styles.rowTableContainer}
        />
      </View>
    </View>
  );
};

export default BottomSectionPDF;
