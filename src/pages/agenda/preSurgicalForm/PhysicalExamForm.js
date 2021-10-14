import Grid from '@material-ui/core/Grid';
import React from 'react';

import AirwayExamForm from './physicalExamForm/AirwayExamForm';
import FirstSectionPhysicalExam from './physicalExamForm/FirstSectionPhysicalExam';
import MedicalStudies from './physicalExamForm/MedicalStudies';
import useStyles from './physicalExamForm/useStyles';

const PhysicalExamForm = ({ className, isRequiredError, isUnresolved }, ref) => {
  const classes = useStyles();
  const { firstSectionErrorState, isRequiredAirwaySectionState } = isRequiredError;
  const { isFirstSectionUnresolved, isMedicalStudiesUnresolved } = isUnresolved;
  const { firstSectionRef, isMedicalStudiesUnresolvedRef } = ref;
  return (
    <Grid container className={className}>
      <FirstSectionPhysicalExam
        className={classes.rowDoubleBottomMargin}
        isUnresolvedError={isFirstSectionUnresolved}
        isRequiredError={firstSectionErrorState}
        ref={firstSectionRef}
      />
      <AirwayExamForm
        className={classes.rowDoubleBottomMargin}
        isRequiredError={isRequiredAirwaySectionState}
      />
      <MedicalStudies
        isUnresolvedError={isMedicalStudiesUnresolved}
        ref={isMedicalStudiesUnresolvedRef}
      />
    </Grid>
  );
};
export default React.memo(React.forwardRef(PhysicalExamForm));
