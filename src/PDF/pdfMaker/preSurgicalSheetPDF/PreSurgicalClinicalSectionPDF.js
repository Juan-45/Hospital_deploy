import { Text, View } from '@react-pdf/renderer';
import BodyMainHeaderPDF from 'PDF/layout/BodyMainHeaderPDF';

import PreSurgicalItemPDF from './PreSurgicalItemPDF';
import styles from './preSurgicalClinicalSectionPDF/styles';
import PreSurgicalClinicalItemBodyPDF from './preSurgicalItemPDF/PreSurgicalClinicalItemBodyPDF';
import TreatmenstList from './preSurgicalItemPDF/TreatmentListPDF';

const PreSurgicalClinicalSectionPDF = ({ valuesObj }) => {
  const { preSurgicalClinicalConditions, treatments } = valuesObj;

  const labels = [
    {
      key: 'cardiovascular',
      label: 'Afecciones Cardiovasculares',
      conditionsLabels: {
        checkboxHypertension: 'Hipertensión',
        checkboxArrhythmias: 'Arrítamias',
        checkboxStableAnginaCF: 'Ángor est. CF',
        checkboxUnstableAngina: 'Ángor inest.',
        checkboxAMIDate: 'IAM Tiempo',
        checkboxValvularHeartDisease: 'Valvulopatía',
        checkboxDyspnoeaCF: 'Disnea CF',
        checkboxheartSurgeryDate: 'Cirugía Card. Tiempo',
        checkboxPacemaker: 'Marcapaso',
        checkboxEdema: 'Edemas',
        checkboxVaricoseVeins: 'Várices',
      },
    },
    {
      key: 'respiratory',
      label: 'Afecciones Respiratorias',
      conditionsLabels: {
        checkboxAsthma: 'Asma',
        checkboxCOPD: 'EPOC',
        checkboxSmoking: 'Tabaquismo',
        checkboxCough: 'Tos',
        checkboxExpectoration: 'Expectoración',
        checkboxDyspnoeaCF: 'Disnea CF',
      },
    },
    {
      key: 'ocular',
      label: 'Condición Ocular',
      conditionsLabels: {
        checkboxGlaucoma: 'Glaucoma',
        checkboxWearingContactLenses: 'Uso de lentes de contacto',
      },
    },
    {
      key: 'gastrointestinal',
      label: 'Afecciones Gastrointestinales',
      conditionsLabels: {
        checkboxAcidSensitiveSyndrome: 'Sme. Acido Sensitivo',
        checkboxHiatalHerniaReflux: 'Hernia Hiato - reflujo',
        checkboxOcclusion: 'Oclusión',
        checkboxLiverFailure: 'Insuf. Hepática',
        checkboxHepatitis: 'Hepatitis',
        checkboxCirrhosis: 'Cirrosis',
        checkboxJaundiceCholectosis: 'Ictericia - Colectosis',
      },
    },
    {
      key: 'urinary',
      label: 'Afecciones Urinarias',
      conditionsLabels: {
        checkboxChronicKidneyFailure: 'Insuf. renal crónica',
        checkboxAcuteRenalFailure: 'Insuf. renal aguda',
        checkboxDialysis: 'Diálisis',
        checkboxIncontinence: 'Incontinencia',
        checkboxDysuriaPolish: 'Disuria - Polaquiuria',
      },
    },
    {
      key: 'allergies',
      label: 'Alergias',
      conditionsLabels: {
        checkboxMedicines: 'Medicamentos',
      },
    },
    {
      key: 'endocrineMetabolic',
      label: 'Afecciones Endocrino Metabolicas',
      conditionsLabels: {
        checkboxObesity: 'Obesidad',
        checkboxDiabetes: 'Diabetes',
        checkboxHyperthyroidism: 'Hipertirodismo',
        checkboxHypothyroidism: 'Hipotirodismo',
        checkboxAdrenals: 'Suprarrenales',
        checkboxMalnutrition: 'Desnutrición',
        checkboxDehydration: 'Deshidratación',
        checkboxHyperthermia: 'Hipertermia',
        checkboxAlcoholism: 'Alcoholismo',
      },
    },
    {
      key: 'neuromuscular',
      label: 'Afecciones Neuromusculares',
      conditionsLabels: {
        checkboxCVA: 'ACV',
        checkboxTIA: 'AIT',
        checkboxParesis: 'Paresia',
        checkboxParaesthesia: 'Parestesia',
        checkboxAphasias: 'Afasias',
        checkboxSeizures: 'Convulsiones',
        checkboxIntracranialHypertension: 'Hiper. endocraneana',
        checkboxMyopathies: 'Miopatías',
      },
    },
    {
      key: 'hematological',
      label: 'Hematología',
      conditionsLabels: {
        checkboxAnemia: 'Anemia',
        checkboxCoagulopathies: 'Coagulopatías',
        checkboxTransfusions: 'Transfusiones',
        checkboxJehovahsWitness: 'Testigo de Jehová',
      },
    },
    {
      key: 'connectiveTissueDiseases',
      label: 'Enf. de tej. conectivo',
      conditionsLabels: {
        checkboxSEL: 'LES',
        checkboxRA: 'AR',
        checkboxAntiphospholipidSyndrome: 'Sme. Antifosfolípidos',
      },
    },
    {
      key: 'obstetricGynecologicalHistory',
      label: 'Antec. Ginecobstétricos',
      conditionsLabels: {
        checkboxLMP: 'FUM',
        checkboxPregnancies: 'Embarazos',
        checkboxAbortions: 'Abortos',
        checkboxEclampsia: 'Eclampsia',
        checkboxPreeclampsiaOC: 'Preeclampsia ACO',
      },
    },
    {
      key: 'psychiatric',
      label: 'Afecciones Psiquiátricas',
    },
    {
      key: 'anestheticHistory',
      label: 'Antecedentes Anestésicos',
    },
    {
      key: 'others',
      label: 'Otros',
    },
  ];

  const itemToRender = labels.map((item) => {
    const { key, label, conditionsLabels } = item;
    const currentValue = preSurgicalClinicalConditions[key];
    const isDataAvailable = currentValue === false ? false : true;

    if (currentValue !== undefined) {
      const currentObj = {
        observations: '',
        conditions: [],
      };

      if (isDataAvailable) {
        const { conditions, observations } = currentValue;
        if (observations) {
          currentObj.observations = observations;
        }
        if (conditions) {
          const declaredConditionsLabels = conditions.map((arrItem) => conditionsLabels[arrItem]);
          currentObj.conditions = declaredConditionsLabels;
        }
      }
      return (
        <PreSurgicalItemPDF key={key} title={label}>
          {isDataAvailable ? (
            <PreSurgicalClinicalItemBodyPDF valuesObj={currentObj} />
          ) : (
            <Text style={styles.bodyText}>{key === 'allergies' ? 'Niega.' : 'No.'}</Text>
          )}
        </PreSurgicalItemPDF>
      );
    }
  });
  return (
    <View>
      <BodyMainHeaderPDF text="Clínica Pre-Operatoria." />
      {itemToRender}
      <TreatmenstList valuesArr={treatments} />
    </View>
  );
};

export default PreSurgicalClinicalSectionPDF;
