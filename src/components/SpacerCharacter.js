import clsx from 'clsx';

import useStyles from './spacerCharacter/useStyles';

const SpacerCharacter = ({ children, className }) => {
  const classes = useStyles();
  return <div className={clsx(classes.root, className)}>{children}</div>;
};

export default SpacerCharacter;
