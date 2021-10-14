import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import StandarButton from 'components/StandarButton';
import StandarModal from 'components/StandarModal';

import useStyles from './preSurgicalFormModal/useStyles';

const PreSurgicalFormModal = ({
  handleSubmittForm,
  setStatesGroup,
  conditionsGroup,
  dynamicText,
  staticTextsGroup,
  classNamesGroup,
}) => {
  const classes = useStyles();

  const getTextForBothErrors = (text) =>
    `Se han detectado los siguientes estudios requeridos faltantes: "${text}". Hay campos requeridos Incompletos. Todos los estudios y campos requeridos deben estar completos antes de guardar el formulario como Completado.`;

  const getStringToDisplay = ({ conditions, strings }) => {
    const { medicalStudiesRequired, requiredErrorSetted } = conditions;
    const {
      forMedicalStudiesRequiredSetted,
      forRequiredErrorSetted,
      forFormValidated,
      forBothErrorSetted,
    } = strings;

    const areBothErrorSetted = medicalStudiesRequired && requiredErrorSetted;
    if (areBothErrorSetted) {
      return forBothErrorSetted;
    } else {
      if (medicalStudiesRequired) {
        return forMedicalStudiesRequiredSetted;
      } else if (requiredErrorSetted) {
        return forRequiredErrorSetted;
      } else {
        return forFormValidated;
      }
    }
  };

  const { setIsValidated, setIsPreviewClicked } = setStatesGroup;

  const {
    isValidated,
    areMedicalStudiesRequiredErrorSetted,
    isRequiredErrorSetted,
  } = conditionsGroup;

  const {
    titleIsRequiredErrorSetted,
    titleForAreMedicalStudiesRequiredErrorSetted,
    textForAreMedicalStudiesRequiredErrorSetted,
  } = staticTextsGroup;

  const { bottomLine, errorSettedBlueText } = classNamesGroup;
  const titleForBothErrorSetted = 'Faltan estudios y campos requeridos.';
  const titleForAllIsValidated = 'Todo esta en orden.';
  const textForBothErrorSetted = getTextForBothErrors(dynamicText);
  const textForIsRequiredErrorSetted =
    'Solo podrá guardar el formulario como incompleto, para resolver complételos según corresponda.';

  const textForAllIsValidated =
    'Si va a guardar el formulario como Completado aseguresé que todos los datos fueron cargados correctamente, recuerde que los Pre-Quirúrgicos Completados solo podrán ser modificados por usuarios con permisos de Administrador.';

  const titleToDisplay = getStringToDisplay({
    conditions: {
      medicalStudiesRequired: areMedicalStudiesRequiredErrorSetted,
      requiredErrorSetted: isRequiredErrorSetted,
    },
    strings: {
      forMedicalStudiesRequiredSetted: titleForAreMedicalStudiesRequiredErrorSetted,
      forRequiredErrorSetted: titleIsRequiredErrorSetted,
      forFormValidated: titleForAllIsValidated,
      forBothErrorSetted: titleForBothErrorSetted,
    },
  });

  const textToDisplay = getStringToDisplay({
    conditions: {
      medicalStudiesRequired: areMedicalStudiesRequiredErrorSetted,
      requiredErrorSetted: isRequiredErrorSetted,
    },
    strings: {
      forMedicalStudiesRequiredSetted: textForAreMedicalStudiesRequiredErrorSetted,
      forRequiredErrorSetted: textForIsRequiredErrorSetted,
      forFormValidated: textForAllIsValidated,
      forBothErrorSetted: textForBothErrorSetted,
    },
  });

  return (
    <StandarModal openState={isValidated}>
      <Grid
        container
        justifyContent="center"
        alignContent="flex-start"
        className={classes.modalChildrenContainer}
      >
        <Typography
          className={clsx(
            classes.modalItemsMargin,
            areMedicalStudiesRequiredErrorSetted || isRequiredErrorSetted
              ? errorSettedBlueText
              : classes.isValid
          )}
          variant="h6"
          align="left"
        >
          {titleToDisplay}
        </Typography>
        <Typography className={classes.modalItemsMargin} align="left">
          {textToDisplay}
        </Typography>
        <Grid container justifyContent="flex-start">
          <Grid
            container
            justifyContent="space-between"
            className={clsx(bottomLine, classes.modalButtonsContainer)}
          >
            <StandarButton text="Incompleto" onClick={handleSubmittForm('incomplete')} />
            <StandarButton
              text="Completado"
              disabled={areMedicalStudiesRequiredErrorSetted || isRequiredErrorSetted}
              onClick={handleSubmittForm('completed')}
            />
          </Grid>
          <Grid container justifyContent="space-between">
            <StandarButton
              text="Cancelar"
              onClick={() => {
                setIsValidated(false);
                setIsPreviewClicked(false);
              }}
            />
            <StandarButton
              text="Previsualizar"
              onClick={() => {
                setIsPreviewClicked(true);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </StandarModal>
  );
};

export default PreSurgicalFormModal;
