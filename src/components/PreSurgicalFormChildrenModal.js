import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StandarButton from 'components/StandarButton';
import React from 'react';

import useStyles from './preSurgicalFormChildrenModal/useStyles';

const PreSurgicalFormChildrenModal = (
  { text, handleAcceptButton, handleCancelButton, ...props },
  ref
) => {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="flex-start"
      className={classes.root}
      ref={ref}
      {...props}
    >
      <Typography className={classes.modalItemsMargin}>{text}</Typography>
      <Grid container justifyContent="space-evenly">
        <StandarButton text={'Aceptar'} onClick={handleAcceptButton} />
        <StandarButton text={'Cancelar'} onClick={handleCancelButton} />
      </Grid>
    </Grid>
  );
};
export default React.forwardRef(PreSurgicalFormChildrenModal);
