import moment from 'moment';

const state = {};

const mutations = {};

const actions = {};

const getters = {
  /*eslint no-unused-vars: ["error", { "args": "none" }]*/
  getFreeAppointments: (state, getters, rootState) =>
    appointmentsToEvents(rootState.freeAppointments.appointments),

  /*eslint no-unused-vars: ["error", { "args": "none" }]*/
  getConfirmedAppointments: (state, getters, rootState) =>
    appointmentsToEvents(rootState.confirmedAppointments.confirmedAppointments),

  /*eslint no-unused-vars: ["error", { "args": "none" }]*/
  getOperations: (state, getters, rootState) =>
    operationsToEvents(rootState.operations.operations),
};

function appointmentsToEvents(appointments) {
  return appointments.map(item => {
    const end = moment.unix(item.start);
    end.add(item.duration * 60, 'seconds');
    return {
      id: item.id,
      color: item.patient ? (item.finished ? 'grey' : 'red') : 'green',
      appointmentType: item.priceList.appointmentType.name,
      roomName: item.room.name,
      name: `${item.priceList.appointmentType.name} ${item.room.name}`,
      start: moment.unix(item.start).format('YYYY-MM-DD HH:mm'),
      end: end.format('YYYY-MM-DD HH:mm'),
    };
  });
}

function operationsToEvents(operations) {
  return operations.map(operation => {
    const end = moment.unix(operation.start);
    end.add(1, 'hour');
    console.log(operation);
    return {
      id: operation.id,
      color: 'purple',
      name: `${operation.patientMedicalRecord.user.firstName} ${operation.patientMedicalRecord.user.lastName} ${operation.room.name}`,
      appointmentType: 'Operation',
      roomName: operation.room.name,
      start: moment.unix(operation.start).format('YYYY-MM-DD HH:mm'),
      end: end.format('YYYY-MM-DD HH:mm'),
    };
  });
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
