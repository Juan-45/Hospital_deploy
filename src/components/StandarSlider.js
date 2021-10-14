import Slider from '@material-ui/core/Slider';

import useInput from './standarSlider/useInput';

const StandarSlider = ({ value, nestedHandler, ...props }) => {
  const [valueState, handleOnChange] = useInput(value, nestedHandler);

  return <Slider value={valueState} onChange={handleOnChange} {...props} />;
};

export default StandarSlider;
