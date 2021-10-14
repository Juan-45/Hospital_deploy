import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import FormHeading from 'components/FormHeading';
import React from 'react';

import CompletedStudy from './completedStudiesList/CompletedStudy';
import useStyles from './completedStudiesList/useStyles';

const CompletedStudiesList = ({ className, itemsToRenderProps, setStateObj }) => {
  const classes = useStyles();
  const completedStudiesArr = itemsToRenderProps.map((item) => {
    const { label } = item;
    return (
      <CompletedStudy
        key={label}
        className={classes.rowBottomMargin}
        completedStudiesValues={item}
        setStateObj={setStateObj}
      />
    );
  });

  return (
    <>
      <FormHeading
        key="completedStudies"
        variant="body1"
        className={clsx(className, classes.rowBottomMargin)}
        text="Estudios Completados."
      />
      <Grid container direction="column" className={classes.itemsContainer}>
        {completedStudiesArr}
      </Grid>
    </>
  );
};

export default React.memo(CompletedStudiesList);
