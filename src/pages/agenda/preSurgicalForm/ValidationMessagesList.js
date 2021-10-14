import ValidationMessage from './validationMessagesList/ValidationMessage';

const ValidationMessagesList = ({ validationMessagesArr, className }) =>
  validationMessagesArr.map((item) => (
    <ValidationMessage
      title={item.title}
      key={item.title}
      text={item.text}
      shouldDisplay={item.shouldDisplay}
      headerClassName={item.headerClassName}
      className={className}
    />
  ));

export default ValidationMessagesList;
