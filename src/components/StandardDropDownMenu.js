import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import NestedMenu from './standardDropDownMenu/NestedMenu';
import StandardMenuItem from './standardDropDownMenu/StandardMenuItem';
import useInput from './standardDropDownMenu/useInput';

const StandardDropDownMenu = ({
  menuItemsArr,
  buttonIconJSX,
  buttonText,
  badgePosition,
  badgeContent,
  className,
}) => {
  const {
    anchorEl,
    handleClick,
    handleClose,
    anchorElNested,
    handleOpenNested,
    handleCloseNested,
    handleOnMouseLeaveNested,
  } = useInput();

  return (
    <div>
      <Button
        startIcon={buttonIconJSX}
        size="small"
        onClick={handleClick}
        className={className}
        disableRipple={true}
      >
        <Typography variant="button">{buttonText}</Typography>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
      >
        {menuItemsArr.map((item, index) => {
          if (typeof item === 'string') {
            const badge = index === badgePosition ? badgeContent : null;
            return (
              <StandardMenuItem
                key={item}
                label={item}
                onClick={handleClose}
                badgeContent={badge}
              />
            );
          } else if (typeof item === 'object' && item !== null) {
            return (
              <div key={`nested${item}`}>
                <NestedMenu
                  label={item.label}
                  className={item.lastPatientClassName}
                  items={item.nested}
                  anchorEl={anchorElNested}
                  handleClose={handleCloseNested}
                  handleOpen={handleOpenNested}
                  handleOnMouseLeaveNested={handleOnMouseLeaveNested}
                />
              </div>
            );
          }
        })}
      </Menu>
    </div>
  );
};

export default StandardDropDownMenu;
