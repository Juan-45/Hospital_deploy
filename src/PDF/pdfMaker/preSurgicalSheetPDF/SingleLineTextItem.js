import { Text, View } from '@react-pdf/renderer';
import BodySubSectionHeaderPDF from 'PDF/layout/BodySubSectionHeaderPDF';

import styles from './singleLineTextItem/styles';

const SingleLineTextItem = ({ title, text }) => (
  <View style={styles.sectionWithBottomBorder}>
    <BodySubSectionHeaderPDF text={`${title}:`} />
    <View style={styles.bodyContainer}>
      <Text style={styles.bodyText}>{`${text !== '' ? text : 'N/D'}`}</Text>
    </View>
  </View>
);

export default SingleLineTextItem;
