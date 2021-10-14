import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import StandardBadge from 'components/StandardBadge';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  textRightMargin: theme.responsiveStyles({ marginRight: 19 }),
  ifIcon: {
    display: 'flex',
  },
  menuListItem: {
    paddingLeft: '12px',
  },
}));

const StandardMenuItem = ({ label, onClick, badgeContent, icon, className, ...props }, ref) => {
  const classes = useStyles(icon);
  if (badgeContent) {
    return (
      <MenuItem
        onClick={onClick}
        {...props}
        className={clsx(icon && classes.menuListItem)}
        ref={ref}
      >
        <StandardBadge variant="dot" badgeContent={badgeContent}>
          <Typography className={clsx(classes.textRightMargin, icon && classes.ifIcon)}>
            {icon}
            {label}
          </Typography>
        </StandardBadge>
      </MenuItem>
    );
  }
  return (
    <MenuItem onClick={onClick} className={clsx(icon && classes.menuListItem)} ref={ref}>
      <Typography className={clsx(classes.ifIcon, className)}>
        {icon}
        {label}
      </Typography>
    </MenuItem>
  );
};

export default React.forwardRef(StandardMenuItem);
