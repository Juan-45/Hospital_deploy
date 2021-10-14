import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import FormHeading from 'components/FormHeading';
import React from 'react';

import TreatmentItem from './TreatmentItem';
import useStyles from './treatmentsList/useStyles';

const TreatmentsList = ({ className, itemsToRenderProps, setStateObj }) => {
  const classes = useStyles();
  const consignedTreatmentsArr = itemsToRenderProps.map((item) => {
    const { drug } = item;
    return (
      <TreatmentItem
        key={drug}
        className={classes.rowBottomMargin}
        valuesObj={item}
        setStateObj={setStateObj}
      />
    );
  });

  return (
    <>
      <FormHeading
        key="consignedTreatments"
        variant="body1"
        className={clsx(className, classes.rowBottomMargin)}
        text="Tratamientos Consignados."
      />
      <Grid container direction="column" className={classes.itemsContainer}>
        {consignedTreatmentsArr}
      </Grid>
    </>
  );
};

export default React.memo(TreatmentsList);
