import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StandardBadge from 'components/StandardBadge';
import StandardDropDownMenu from 'components/StandardDropDownMenu';

import useStyles from './userOptions/useStyles';

const UserOptions = ({ badgeValue, badgePosition }) => {
  const classes = useStyles();
  const containerClass = badgeValue !== 0 ? classes.menuWithBadge : classes.menuWithBadgeZero;

  return (
    <StandardBadge badgeContent={badgeValue}>
      <StandardDropDownMenu
        menuItemsArr={['Perfil', 'Configuraciones', 'Administración', 'Cerrar Sesión']}
        buttonIconJSX={<AccountCircleIcon />}
        buttonText="Menu"
        badgePosition={badgePosition}
        badgeContent={badgeValue}
        className={containerClass}
        id="userOptions"
      />
    </StandardBadge>
  );
};

export default UserOptions;
