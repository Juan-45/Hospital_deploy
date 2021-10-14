import FormHeading from 'components/FormHeading';
import FormRow from 'components/FormRow';
import { PreSurgical } from 'context/PreSurgical';
import React from 'react';
import { useContext } from 'react';

import PresurgicalClinicalGenericItem from './preSurgicalClinicalForm/PreSurgicalClinicalGenericItem';
import Treatments from './preSurgicalClinicalForm/Treatments';
import useStyles from './preSurgicalClinicalForm/useStyles';

const PreSurgicalClinicalForm = ({ isTreatmentsUnresolved, className }, ref) => {
  const classes = useStyles();
  const { initialState, updateGlobalState } = useContext(PreSurgical);

  const pSCFormsWithCheckboxesProps = [
    {
      groupTitle: 'Afecciones Cardiovasculares',
      checkboxes: [
        {
          label: 'Hipertensión',
          name: 'checkboxHypertension',
        },
        {
          label: 'Arrítamias',
          name: 'checkboxArrhythmias',
        },
        {
          label: 'Ángor est. CF',
          name: 'checkboxStableAnginaCF',
        },
        {
          label: 'Ángor inest.',
          name: 'checkboxUnstableAngina',
        },
        {
          label: 'IAM Tiempo',
          name: 'checkboxAMIDate',
        },
        {
          label: 'Valvulopatía',
          name: 'checkboxValvularHeartDisease',
        },
        {
          label: 'Disnea CF',
          name: 'checkboxDyspnoeaCF',
        },
        {
          label: 'Cirugía Card. Tiempo',
          name: 'checkboxheartSurgeryDate',
        },
        {
          label: 'Marcapaso',
          name: 'checkboxPacemaker',
        },
        {
          label: 'Edemas',
          name: 'checkboxEdema',
        },
        {
          label: 'Várices',
          name: 'checkboxVaricoseVeins',
        },
      ],
      keyForFormStateNestedObJ: 'cardiovascular',
    },
    {
      groupTitle: 'Afecciones Respiratorias',
      checkboxes: [
        {
          label: 'Asma',
          name: 'checkboxAsthma',
        },
        {
          label: 'EPOC',
          name: 'checkboxCOPD',
        },
        {
          label: 'Tabaquismo',
          name: 'checkboxSmoking',
        },
        {
          label: 'Tos',
          name: 'checkboxCough',
        },
        {
          label: 'Expectoración',
          name: 'checkboxExpectoration',
        },
        {
          label: 'Disnea CF',
          name: 'checkboxDyspnoeaCF',
        },
      ],
      keyForFormStateNestedObJ: 'respiratory',
    },
    {
      groupTitle: 'Condición Ocular',
      checkboxes: [
        {
          label: 'Glaucoma',
          name: 'checkboxGlaucoma',
        },
        {
          label: 'Uso de lentes de contacto',
          name: 'checkboxWearingContactLenses',
        },
      ],
      keyForFormStateNestedObJ: 'ocular',
    },
    {
      groupTitle: 'Afecciones Gastrointestinales',
      checkboxes: [
        {
          label: 'Sme. Acido Sensitivo',
          name: 'checkboxAcidSensitiveSyndrome',
        },
        {
          label: 'Hernia Hiato - reflujo',
          name: 'checkboxHiatalHerniaReflux',
        },
        {
          label: 'Oclusión',
          name: 'checkboxOcclusion',
        },
        {
          label: 'Insuf. Hepática',
          name: 'checkboxLiverFailure',
        },
        {
          label: 'Hepatitis',
          name: 'checkboxHepatitis',
        },
        {
          label: 'Cirrosis',
          name: 'checkboxCirrhosis',
        },
        {
          label: 'Ictericia - Colectosis',
          name: 'checkboxJaundiceCholectosis',
        },
      ],
      keyForFormStateNestedObJ: 'gastrointestinal',
    },
    {
      groupTitle: 'Afecciones Urinarias',
      checkboxes: [
        {
          label: 'Insuf. renal crónica',
          name: 'checkboxChronicKidneyFailure',
        },
        {
          label: 'Insuf. renal aguda',
          name: 'checkboxAcuteRenalFailure',
        },
        {
          label: 'Diálisis',
          name: 'checkboxDialysis',
        },
        {
          label: 'Incontinencia',
          name: 'checkboxIncontinence',
        },
        {
          label: 'Disuria - Polaquiuria',
          name: 'checkboxDysuriaPolish',
        },
      ],
      keyForFormStateNestedObJ: 'urinary',
    },
    {
      groupTitle: 'Alergias',
      checkboxes: [
        {
          label: 'Medicamentos',
          name: 'checkboxMedicines',
        },
      ],
      keyForFormStateNestedObJ: 'allergies',
    },
    {
      groupTitle: 'Afecciones Endocrino Metabolicas',
      checkboxes: [
        {
          label: 'Obesidad',
          name: 'checkboxObesity',
        },
        {
          label: 'Diabetes',
          name: 'checkboxDiabetes',
        },
        {
          label: 'Hipertirodismo',
          name: 'checkboxHyperthyroidism',
        },
        {
          label: 'Hipotirodismo',
          name: 'checkboxHypothyroidism',
        },
        {
          label: 'Suprarrenales',
          name: 'checkboxAdrenals',
        },
        {
          label: 'Desnutrición',
          name: 'checkboxMalnutrition',
        },
        {
          label: 'Deshidratación',
          name: 'checkboxDehydration',
        },
        {
          label: 'Hipertermia',
          name: 'checkboxHyperthermia',
        },
        {
          label: 'Alcoholismo',
          name: 'checkboxAlcoholism',
        },
      ],
      keyForFormStateNestedObJ: 'endocrineMetabolic',
    },
    {
      groupTitle: 'Afecciones Neuromusculares',
      checkboxes: [
        {
          label: 'ACV',
          name: 'checkboxCVA',
        },
        {
          label: 'AIT',
          name: 'checkboxTIA',
        },
        {
          label: 'Paresia',
          name: 'checkboxParesis',
        },
        {
          label: 'Parestesia',
          name: 'checkboxParaesthesia',
        },
        {
          label: 'Afasias',
          name: 'checkboxAphasias',
        },
        {
          label: 'Convulsiones',
          name: 'checkboxSeizures',
        },
        {
          label: 'Hiper. endocraneana',
          name: 'checkboxIntracranialHypertension',
        },
        {
          label: 'Miopatías',
          name: 'checkboxMyopathies',
        },
      ],
      keyForFormStateNestedObJ: 'neuromuscular',
    },
    {
      groupTitle: 'Hematología',
      checkboxes: [
        {
          label: 'Anemia',
          name: 'checkboxAnemia',
        },
        {
          label: 'Coagulopatías',
          name: 'checkboxCoagulopathies',
        },
        {
          label: 'Transfusiones',
          name: 'checkboxTransfusions',
        },
        {
          label: 'Testigo de Jehová',
          name: 'checkboxJehovahsWitness',
        },
      ],
      keyForFormStateNestedObJ: 'hematological',
    },
    {
      groupTitle: 'Enf. de tej. conectivo',
      checkboxes: [
        {
          label: 'LES',
          name: 'checkboxSEL',
        },
        {
          label: 'AR',
          name: 'checkboxRA',
        },
        {
          label: 'Sme. Antifosfolípidos',
          name: 'checkboxAntiphospholipidSyndrome',
        },
      ],
      keyForFormStateNestedObJ: 'connectiveTissueDiseases',
    },
    {
      groupTitle: 'Antec. Ginecobstétricos',
      checkboxes: [
        {
          label: 'FUM',
          name: 'checkboxLMP',
        },
        {
          label: 'Embarazos',
          name: 'checkboxPregnancies',
        },
        {
          label: 'Abortos',
          name: 'checkboxAbortions',
        },
        {
          label: 'Eclampsia',
          name: 'checkboxEclampsia',
        },
        {
          label: 'Preeclampsia ACO',
          name: 'checkboxPreeclampsiaOC',
        },
      ],
      keyForFormStateNestedObJ: 'obstetricGynecologicalHistory',
    },
  ];

  const pSCFormsWithoutCheckboxesProps = [
    { groupTitle: 'Afecciones Psiquiátricas', keyForFormStateNestedObJ: 'psychiatric' },
    {
      groupTitle: 'Antecedentes Anestésicos',
      keyForFormStateNestedObJ: 'anestheticHistory',
    },
    {
      groupTitle: 'Otros',
      keyForFormStateNestedObJ: 'others',
    },
  ];

  const { preSurgicalClinical, treatments } = initialState;
  const pSCFormsWithCheckboxesArray = pSCFormsWithCheckboxesProps.map((item) => {
    const currentGroupTitle = item['groupTitle'];
    const currentCheckboxes = item['checkboxes'];

    const currentShallowStateKey = item['keyForFormStateNestedObJ'];
    const key = currentShallowStateKey;
    const currentFormValues = preSurgicalClinical[currentShallowStateKey];

    return (
      <PresurgicalClinicalGenericItem
        groupTitle={currentGroupTitle}
        checkboxesArr={currentCheckboxes}
        key={key}
        currentShallowStateKey={currentShallowStateKey}
        formValues={currentFormValues}
        setFormState={updateGlobalState}
        textAreaPlaceHolder="/..Observaciones..."
        addButtonText="Agregar Observación"
        className={classes.rowBottomMargin}
      />
    );
  });

  const pSCFormsWithoutCheckboxesArray = pSCFormsWithoutCheckboxesProps.map((item) => {
    const currentGroupTitle = item['groupTitle'];
    const currentShallowStateKey = item['keyForFormStateNestedObJ'];
    const key = currentShallowStateKey;
    const currentFormValues = preSurgicalClinical[currentShallowStateKey];

    return (
      <PresurgicalClinicalGenericItem
        groupTitle={currentGroupTitle}
        key={key}
        currentShallowStateKey={currentShallowStateKey}
        formValues={currentFormValues}
        setFormState={updateGlobalState}
        textAreaPlaceHolder="/..Observaciones..."
        addButtonText="Agregar Observación"
        className={classes.rowBottomMargin}
        textAreaClassName={classes.noCheckboxesTextArea}
      />
    );
  });

  return (
    <FormRow className={className}>
      <FormHeading
        className={classes.rowBottomMargin}
        text="Clínica Pre-Operatoria."
        variant="body1"
      />
      {pSCFormsWithCheckboxesArray}
      {pSCFormsWithoutCheckboxesArray}
      <Treatments
        formValues={treatments}
        setFormState={updateGlobalState}
        isUnresolvedError={isTreatmentsUnresolved}
        ref={ref}
      />
    </FormRow>
  );
};

export default React.memo(React.forwardRef(PreSurgicalClinicalForm));
