import Menu from '@material-ui/core/Menu';
import { ArrowLeft } from '@material-ui/icons';
import React from 'react';

import StandardMenuItem from './StandardMenuItem';

const NestedMenu = ({
  items,
  label,
  anchorEl,
  handleClose,
  handleOnMouseLeaveNested,
  handleOpen,
  className,
}) => {
  const nestedArr = items.map((item) => (
    <StandardMenuItem key={item} label={item} onClick={handleClose} />
  ));

  return (
    <div onClick={handleOpen}>
      <StandardMenuItem label={label} icon={<ArrowLeft fontSize="small" />} className={className} />
      <Menu
        id="addButtonExtraOptions"
        MenuListProps={{ onMouseLeave: handleOnMouseLeaveNested }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
        getContentAnchorEl={undefined}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>{nestedArr}</div>
      </Menu>
    </div>
  );
};

export default NestedMenu;
