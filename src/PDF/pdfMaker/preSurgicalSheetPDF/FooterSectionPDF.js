import { Text, View } from '@react-pdf/renderer';

import styles from './footerSectionPDF/styles';

const FooterSectionPDF = () => (
  <View fixed style={styles.footerSection}>
    <Text
      style={styles.footerSectionText}
      render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}.`}
    />
  </View>
);
export default FooterSectionPDF;
