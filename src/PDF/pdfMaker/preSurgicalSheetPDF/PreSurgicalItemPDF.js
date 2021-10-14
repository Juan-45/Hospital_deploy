import { View } from '@react-pdf/renderer';
import BodySubSectionHeaderPDF from 'PDF/layout/BodySubSectionHeaderPDF';

import styles from './preSurgicalItemPDF/styles';

const PreSurgicalItemPDF = ({ title, children }) => (
  <View style={styles.rootContainer} wrap={false}>
    <BodySubSectionHeaderPDF text={`${title}:`} />
    {children}
  </View>
);

export default PreSurgicalItemPDF;
