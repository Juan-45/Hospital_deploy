import StandarTextareaAutosize from './StandarTextareaAutosize';
import TitledItem from './TitledItem';

const TitledTextAreaAutoSize = ({ title, className, classNameTextArea, ...props }) => (
  <TitledItem title={title} className={className}>
    <StandarTextareaAutosize className={classNameTextArea} {...props} />
  </TitledItem>
);
export default TitledTextAreaAutoSize;
