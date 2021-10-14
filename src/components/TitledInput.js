import React from 'react';

import InputText from './InputText';
import TitledItem from './TitledItem';

const TitledInput = ({ inputTitle, placeholder, className, ...props }, ref) => (
  <TitledItem title={inputTitle} className={className}>
    <InputText placeholder={placeholder} ref={ref} {...props} />
  </TitledItem>
);

export default React.forwardRef(TitledInput);
