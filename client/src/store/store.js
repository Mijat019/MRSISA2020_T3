import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import clinics from './modules/clinics';
import doctors from './modules/doctors';
import appointmentTypes from './modules/appointmentTypes';
import appointmentTypesDialog from './modules/appointmentTypesDialog';
import nurses from './modules/nurses';
import rooms from './modules/rooms';
import doctorSpec from './modules/doctorSpec';
import roomsDialog from './modules/roomsDialog';
import snackbar from './modules/snackbar';
import authentication from './modules/authentication';
import profile from './modules/profile';
import patients from './modules/patients';
import clinicAdmins from './modules/clinicAdmins';
import patientRequests from './modules/patientRequests';
import freeAppointments from './modules/freeAppointments';
import freeAppointmentsDialog from './modules/freeAppointmentsDialog';
import drugs from './modules/drugs';
import drugsDialog from './modules/drugsDialog';
import diagnosis from './modules/diagnosis';
import diagnosisDialog from './modules/diagnosisDialog';
import clinicCenterAdmins from './modules/clinicCenterAdmins';
import priceLists from './modules/priceLists';
import confirmedAppointments from './modules/confirmedAppointments/confirmedAppointments';
import appointmentReport from './modules/confirmedAppointments/appointmentReport'
import scheduleCustomAppointment from './modules/customAppointment/scheduleCustomAppointment';
import scheduleCustomAppointmentDialog from './modules/customAppointment/scheduleCustomAppointmentDialog';
import prescriptions from './modules/prescriptions';
import ratings from './modules/ratings';
import time from './modules/time';
import leaveRequests from './modules/leaveRequests';
import prescriptionApproving from './modules/prescriptionApproving';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: window.localStorage,
});

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  modules: {
    authentication,
    profile,
    patients,
    clinics,
    doctors,
    doctorSpec,
    clinicAdmins,
    nurses,
    rooms,
    roomsDialog,
    snackbar,
    patientRequests,
    freeAppointments,
    freeAppointmentsDialog,
    appointmentTypes,
    appointmentTypesDialog,
    drugs,
    drugsDialog,
    diagnosis,
    diagnosisDialog,
    clinicCenterAdmins,
    priceLists,
    confirmedAppointments,
    scheduleCustomAppointment,
    scheduleCustomAppointmentDialog,
    prescriptions,
    time,
    leaveRequests,
    ratings,
    appointmentReport
    prescriptionApproving,
    develop
  },
});
