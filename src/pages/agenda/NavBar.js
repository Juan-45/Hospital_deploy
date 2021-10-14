import Grid from '@material-ui/core/Grid';
import StandarButton from 'components/StandarButton';
import React from 'react';

import MainBar from './navBar/MainBar';
import MenuButton from './navBar/MenuButton';
import NavegationBar from './navBar/NavigationBar';
import useStyles from './navBar/useStyles';

//GUIDELANCE if one of the central buttons is clicked it will fire a request of procedures or pre-surgicals by date as applicable

const NavBar = () => {
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Grid container justifyContent="space-between">
        <MainBar />
        <NavegationBar />
      </Grid>
      <Grid container alignItems="center" className={classes.buttonsBar}>
        <Grid container justifyContent="center" className={classes.buttonsContainer}>
          <StandarButton text="Pre-Quirúrgicos" />
          <StandarButton text="Procedimientos" className={classes.leftButtonMargin} />
        </Grid>
        <MenuButton
          lastPatient="Marcos Colabitti"
          buttonText="+ Nuevo"
          className={classes.menuButton}
        />
      </Grid>
    </Grid>
  );
};

export default NavBar;
