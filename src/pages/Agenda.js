import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { es } from 'date-fns/locale';

import Footer from './agenda/Footer';
import NavBar from './agenda/NavBar';
import PreSurgicalForm from './agenda/PreSurgicalForm';
//import ItemsList from '../../Pages/Agenda/ItemsList';
//import PatientForm from './Forms/PatientForm';

//PreSurgical bySearch
/*
const case_1PS = {
  '25/02/2021': {
    personalData: {
      patientLastName: 'Herrera',
      patientFirstName: 'Juan José',
      patientIdentityNumber: '35.243.852',
    },
    preSurgicalData: {
      id: 'preSurgicalaaa',
      isPreSurgicalDone: true,
      registeredSchedule: '23:35',
      asaValue: 'i',
      isAirwayCompromised: true,
      allergies: ['Ciprofloxacina', 'Ibuprofeno', 'Insulina', 'Sulfamidas'],
      pendingStudies: ['Radiografía torax', 'ECG'],
      doctorInitials: 'JC',
    },
    procedureData: {
      isProcedureDone: false,
    },
  },

  '11/02/2021': {
    personalData: {
      patientLastName: 'Herrera',
      patientFirstName: 'Juan José',
      patientIdentityNumber: '35.243.852',
    },
    preSurgicalData: {
      id: 'preSurgicalaab',
      isPreSurgicalDone: false,
      registeredSchedule: '23:35',
      asaValue: 'i',
      isAirwayCompromised: true,
      allergies: ['Ciprofloxacina', 'Ibuprofeno', 'Insulina', 'Sulfamidas'],
      pendingStudies: 'doesNotHave',
      doctorInitials: 'JC',
    },
    procedureData: {
      isProcedureDone: false,
    },
  },

  '08/02/2021': {
    personalData: {
      patientLastName: 'Herrera',
      patientFirstName: 'Juan José',
      patientIdentityNumber: '35.243.852',
    },
    preSurgicalData: {
      id: 'preSurgicalaab',
      isPreSurgicalDone: true,
      registeredSchedule: '08:35',
      asaValue: 'i',
      isAirwayCompromised: true,
      allergies: ['Ciprofloxacina', 'Ibuprofeno', 'Insulina', 'Sulfamidas'],
      pendingStudies: 'doesNotHave',
      doctorInitials: 'VH',
    },
    procedureData: {
      isProcedureDone: true,
      '19:00': {
        id: 'procedureDataaaa1',
        procedure: 'Cirugía_2',
        doctorInitials: 'JC',
        startDateAndTime: '25 / 02 / 2021 - 19:00 Hs',
        endDateAndTime: '25 / 02 / 2021 - 23:05 Hs',
      },
      '13:00': {
        id: 'procedureDataaaa2',
        procedure: 'Cirugía_1',
        doctorInitials: 'JC',
        startDateAndTime: '25 / 02 / 2021 - 13:00 Hs',
        endDateAndTime: '25 / 02 / 2021 - 16:05 Hs',
      },
    },
  },

  '05/02/2021': {
    personalData: {
      patientLastName: 'Herrera',
      patientFirstName: 'Juan José',
      patientIdentityNumber: '35.243.852',
    },
    preSurgicalData: {
      id: 'preSurgicalaad',
      isPreSurgicalDone: true,
      registeredSchedule: '03:35',
      asaValue: 'i',
      isAirwayCompromised: true,
      allergies: ['Ciprofloxacina', 'Ibuprofeno', 'Insulina', 'Sulfamidas'],
      pendingStudies: 'doesNotHave',
      doctorInitials: 'JC',
    },
    procedureData: {
      isProcedureDone: true,
      '8:30': {
        id: 'procedureDataaad',
        procedure: 'Cirugía_1',
        doctorInitials: 'JC',
        startDateAndTime: '07 / 02 / 2021 - 08:30 Hs',
        endDateAndTime: '07 / 02 / 2021 - 11:00 Hs',
      },
    },
  },

  '04/02/2021': {
    personalData: {
      patientLastName: 'Herrera',
      patientFirstName: 'Juan José',
      patientIdentityNumber: '35.243.852',
    },
    preSurgicalData: {
      id: 'preSurgicalaae',
      isPreSurgicalDone: true,
      registeredSchedule: '03:35',
      asaValue: 'i',
      isAirwayCompromised: true,
      allergies: ['Ciprofloxacina', 'Ibuprofeno', 'Insulina', 'Sulfamidas'],
      pendingStudies: 'doesNotHave',
      doctorInitials: 'JC',
    },
    procedureData: {
      isProcedureDone: true,
      '19:30': {
        id: 'procedureDataaae',
        procedure: 'Cirugía_1',
        doctorInitials: 'RB',
        startDateAndTime: '08 / 02 / 2021 - 19:30 Hs',
        endDateAndTime: '08 / 02 / 2021 - 23:00 Hs',
      },
    },
  },
};*/

//PreSurgical byDate
/*
const case_2PS = {
  '20:00': {
    personalData: {
      patientLastName: 'Rizzo',
      patientFirstName: 'Marcos Emanuel',
      patientIdentityNumber: '29.548.356',
    },
    preSurgicalData: {
      id: 'preSurgicalaah',
      isPreSurgicalDone: false,
      registeredSchedule: '20:00',
      asaValue: 'iii',
      isAirwayCompromised: true,
      allergies: 'incomplete',
      pendingStudies: ['Radiografía torax', 'ECG'],
      doctorInitials: 'FP',
    },
    procedureData: {
      id: 'procedureDataaah',
      isProcedureDone: false,
    },
  },
  '15:55': {
    personalData: {
      patientLastName: 'Cole',
      patientFirstName: 'Matías',
      patientIdentityNumber: '30.254.896',
    },
    preSurgicalData: {
      id: 'preSurgicalaai',
      isPreSurgicalDone: true,
      registeredSchedule: '15:55',
      asaValue: 'iv',
      isAirwayCompromised: false,
      allergies: 'doesNotHave',
      pendingStudies: 'doesNotHave',
      doctorInitials: 'VH',
    },
    procedureData: {
      id: 'procedureDataaai',
      isProcedureDone: false,
    },
  },
  '12:11': {
    personalData: {
      patientLastName: 'Pérez',
      patientFirstName: 'Fiama Sofía',
      patientIdentityNumber: '36.325.789',
    },
    preSurgicalData: {
      id: 'preSurgicalaaj',
      isPreSurgicalDone: false,
      registeredSchedule: '12:11',
      asaValue: 'v',
      isAirwayCompromised: false,
      allergies: 'doesNotHave',
      pendingStudies: ['Radiografía torax'],
      doctorInitials: 'VH',
    },
    procedureData: {
      id: 'procedureDataaaj',
      isProcedureDone: false,
    },
  },
  '08:35': {
    personalData: {
      patientLastName: 'Ramirez',
      patientFirstName: 'Fernando',
      patientIdentityNumber: '32.114.785',
    },
    preSurgicalData: {
      id: 'preSurgicalaak',
      isPreSurgicalDone: false,
      registeredSchedule: '08:35',
      asaValue: 'vi',
      isAirwayCompromised: false,
      allergies: ['Insulina'],
      pendingStudies: ['Radiografía torax'],
      doctorInitials: 'VH',
    },
    procedureData: {
      id: 'procedureDataaak',
      isProcedureDone: false,
    },
  },
  '03:35': {
    personalData: {
      patientLastName: 'Herrera',
      patientFirstName: 'Juan José',
      patientIdentityNumber: '35.243.852',
    },
    preSurgicalData: {
      id: 'preSurgicalaal',
      isPreSurgicalDone: true,
      registeredSchedule: '03:35',
      asaValue: 'i',
      isAirwayCompromised: true,
      allergies: ['Ciprofloxacina', 'Ibuprofeno', 'Insulina', 'Sulfamidas'],
      pendingStudies: 'doesNotHave',
      doctorInitials: 'JC',
    },
    procedureData: {
      isProcedureDone: true,
      '19:30': {
        id: 'procedureDataaal',
        procedure: 'Cirugía_2',
        doctorInitials: 'RB',
        startDateAndTime: '08 / 02 / 2021 - 19:30 Hs',
        endDateAndTime: '08 / 02 / 2021 - 23:00 Hs',
      },
      '13:30': {
        id: 'procedureDataaal',
        procedure: 'Cirugía_1',
        doctorInitials: 'RB',
        startDateAndTime: '08 / 02 / 2021 - 13:30 Hs',
        endDateAndTime: '08 / 02 / 2021 - 17:00 Hs',
      },
    },
  },
};*/

//Procedure bySearch
/*
const case_1P = {
  '25/02/2021': {
    personalData: {
      patientLastName: 'Herrera',
      patientFirstName: 'Juan José',
      patientIdentityNumber: '35.243.852',
    },
    procedureData: {
      '19:00': {
        id: 'procedureDataaaa1',
        isProcedureDone: true,
        procedure: 'Cirugía_1',
        doctorInitials: 'JC',
        startDateAndTime: '25 / 02 / 2021 - 19:00 Hs',
        endDateAndTime: '25 / 02 / 2021 - 23:05 Hs',
      },
      '13:00': {
        id: 'procedureDataaaa2',
        isProcedureDone: true,
        procedure: 'Cirugía_2',
        doctorInitials: 'JC',
        startDateAndTime: '25 / 02 / 2021 - 13:00 Hs',
        endDateAndTime: '25 / 02 / 2021 - 16:05 Hs',
      },
    },
  },

  '11/02/2021': {
    personalData: {
      patientLastName: 'Herrera',
      patientFirstName: 'Juan José',
      patientIdentityNumber: '35.243.852',
    },
    procedureData: {
      '12:00': {
        id: 'procedureDataaab',
        isProcedureDone: true,
        procedure: 'Cirugía_1',
        doctorInitials: 'JC',
        startDateAndTime: '11 / 02 / 2021 - 12:00 Hs',
        endDateAndTime: '11 / 02 / 2021 - 17:05 Hs',
      },
    },
  },

  '08/02/2021': {
    personalData: {
      patientLastName: 'Herrera',
      patientFirstName: 'Juan José',
      patientIdentityNumber: '35.243.852',
    },
    procedureData: {
      '13:41': {
        id: 'procedureDataaac',
        isProcedureDone: true,
        procedure: 'Cirugía_1',
        doctorInitials: 'JC',
        startDateAndTime: '08 / 02 / 2021 - 13:41 Hs',
        endDateAndTime: '08 / 02 / 2021 - 16:05 Hs',
      },
    },
  },

  '05/02/2021': {
    personalData: {
      patientLastName: 'Herrera',
      patientFirstName: 'Juan José',
      patientIdentityNumber: '35.243.852',
    },
    procedureData: {
      '08:30': {
        id: 'procedureDataaad',
        isProcedureDone: true,
        procedure: 'Cirugía_1',
        doctorInitials: 'JC',
        startDateAndTime: '05 / 02 / 2021 - 08:30 Hs',
        endDateAndTime: '05 / 02 / 2021 - 11:00 Hs',
      },
    },
  },

  '04/02/2021': {
    personalData: {
      patientLastName: 'Herrera',
      patientFirstName: 'Juan José',
      patientIdentityNumber: '35.243.852',
    },
    procedureData: {
      '19:30': {
        id: 'procedureDataaae',
        isProcedureDone: true,
        procedure: 'Cirugía_1',
        doctorInitials: 'RB',
        startDateAndTime: '04 / 02 / 2021 - 19:30 Hs',
        endDateAndTime: '04 / 02 / 2021 - 23:00 Hs',
      },
    },
  },
};*/

//Procedure byDate
/*
const case_2P = {
  '20:00': {
    personalData: {
      patientLastName: 'Rizzo',
      patientFirstName: 'Marcos Emanuel',
      patientIdentityNumber: '29.548.356',
    },
    procedureData: {
      id: 'procedureDataaaa1',
      isProcedureDone: false,
      procedure: 'Cirugía_1',
      doctorInitials: 'JC',
      startDateAndTime: '25 / 02 / 2021 - 20:00 Hs',
      endDateAndTime: '25 / 02 / 2021 - 23:05 Hs',
    },
  },

  '17:00': {
    personalData: {
      patientLastName: 'Rizzo',
      patientFirstName: 'Marcos Emanuel',
      patientIdentityNumber: '29.548.356',
    },
    procedureData: {
      id: 'procedureDataaaa2',
      isProcedureDone: false,
      procedure: 'Cirugía_2',
      doctorInitials: 'JC',
      startDateAndTime: '25 / 02 / 2021 - 17:00 Hs',
      endDateAndTime: '25 / 02 / 2021 - 19:05 Hs',
    },
  },

  '15:55': {
    personalData: {
      patientLastName: 'Cole',
      patientFirstName: 'Matías',
      patientIdentityNumber: '30.254.896',
    },
    procedureData: {
      id: 'procedureDataaab',
      isProcedureDone: false,
      procedure: 'Cirugía_1',
      doctorInitials: 'JC',
      startDateAndTime: '25 / 02 / 2021 - 15:55 Hs',
      endDateAndTime: '25 / 02 / 2021 - 17:05 Hs',
    },
  },

  '12:11': {
    personalData: {
      patientLastName: 'Pérez',
      patientFirstName: 'Fiama Sofía',
      patientIdentityNumber: '36.325.789',
    },
    procedureData: {
      id: 'procedureDataaac',
      isProcedureDone: true,
      procedure: 'Cirugía_1',
      doctorInitials: 'JC',
      startDateAndTime: '25 / 02 / 2021 - 12:11 Hs',
      endDateAndTime: '25 / 02 / 2021 - 16:05 Hs',
    },
  },
  '08:35': {
    personalData: {
      patientLastName: 'Ramirez',
      patientFirstName: 'Fernando',
      patientIdentityNumber: '32.114.785',
    },

    procedureData: {
      id: 'procedureDataaad',
      isProcedureDone: true,
      procedure: 'Cirugía_1',
      doctorInitials: 'JC',
      startDateAndTime: '25 / 02 / 2021 - 08:35 Hs',
      endDateAndTime: '25 / 02 / 2021 - 16:05 Hs',
    },
  },
  '03:35': {
    personalData: {
      patientLastName: 'Herrera',
      patientFirstName: 'Juan José',
      patientIdentityNumber: '35.243.852',
    },
    procedureData: {
      id: 'procedureDataaae',
      isProcedureDone: true,
      procedure: 'Cirugía_1',
      doctorInitials: 'JC',
      startDateAndTime: '25 / 02 / 2021 - 03:35 Hs',
      endDateAndTime: '25 / 02 / 2021 - 09:05 Hs',
    },
  },
};*/

//COMMENTS:

//WITH CASE_2 use fromRequest='byDate'

//GUIDELANCE render ItemList only after recive the ItemList requested
//GUIDELANCE the ItemList object must be recived by pages of a specified quantity of item

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: theme.palette.mainBackground.main,
    [theme.breakpoints.up('xs')]: { paddingBottom: '124px' },
    [theme.breakpoints.up('sm')]: { paddingBottom: '174px' },
    [theme.breakpoints.up('lg')]: { paddingBottom: '180px' },
  },
}));

const Agenda = () => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
      <NavBar />
      <Grid container direction="column" className={classes.root}>
        {/*
      
        

      */}

        <PreSurgicalForm />

        {/*  <PatientForm />  
      
   <ItemsList fromRequest="byDate" shouldDisplayFor="procedure" itemsData={case_2P} />
      */}
      </Grid>
      <Footer />
    </MuiPickersUtilsProvider>
  );
};

export default Agenda;
