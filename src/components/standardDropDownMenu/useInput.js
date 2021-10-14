import { useState } from 'react';

const useMenuHandlers = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNested, setAnchorElNested] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNested = (event) => {
    if (anchorElNested === null) {
      setAnchorElNested(event.currentTarget);
    }
  };

  const handleCloseNested = () => {
    setAnchorElNested(null);
    handleClose();
  };

  const handleOnMouseLeaveNested = () => {
    setAnchorElNested(null);
  };

  return {
    anchorEl,
    handleClick,
    handleClose,
    anchorElNested,
    handleOpenNested,
    handleCloseNested,
    handleOnMouseLeaveNested,
  };
};

export default useMenuHandlers;
