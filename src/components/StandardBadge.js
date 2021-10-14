import Badge from '@material-ui/core/Badge';

const BadgeStandard = ({ children, badgeContent, ...props }) => (
  <Badge
    variant="standard"
    color="error"
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    max={9}
    badgeContent={badgeContent}
    {...props}
  >
    {children}
  </Badge>
);

export default BadgeStandard;
