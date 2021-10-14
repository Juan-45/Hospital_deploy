import StandardDropDownMenu from 'components/StandardDropDownMenu';

import useStyles from './menuButton/useStyles';

const MenuButton = ({ lastPatient, buttonText, className, ...props }) => {
  const classes = useStyles();
  const menuItemsArr = [
    '+ Nuevo Paciente',
    lastPatient
      ? {
          label: lastPatient,
          lastPatientClassName: lastPatient ? classes.lastPatient : null,
          nested: ['+ Nuevo Pre-Q', '+ Nuevo Proc.'],
        }
      : null,
  ];
  return (
    <StandardDropDownMenu
      menuItemsArr={menuItemsArr}
      buttonText={buttonText}
      className={className}
      {...props}
    />
  );
};

export default MenuButton;
