import moment from 'moment';

const getInitialState = () => {
  return {
    events: []
  }
}

const state = getInitialState();

const mutations = {
  resetState(state) {
    state = getInitialState();
  },
  addEvent(state, event) {
    state.events.push(event);
  },

  removeLastEvent(state) {
    state.events.pop();
  },
};

const actions = {};

const getters = {
  /*eslint no-unused-vars: ["error", { "args": "none" }]*/
  getEvents: (state, getters, rootState) => {
    const test = [
      ...appointmentsToEvents(rootState.freeAppointments.appointments),
      ...appointmentsToEvents(
        rootState.confirmedAppointments.confirmedAppointments
      ),
      ...operationsToEvents(rootState.operations.operations),
      ...attendancesToEvents(rootState.operations.operationAttendances),
    ];

    state.events = test;
    return test;
  },
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
      name: `${item.priceList.appointmentType.name}, ${item.room.name}`,
      start: moment.unix(item.start).format('YYYY-MM-DD HH:mm'),
      end: end.format('YYYY-MM-DD HH:mm'),
    };
  });
}

function operationsToEvents(operations) {
  return operations.map(operation => {
    const end = moment.unix(operation.start);
    end.add(1, 'hour');
    return {
      id: operation.id,
      color: 'purple',
      name: `${operation.patientMedicalRecord.user.firstName} ${operation.patientMedicalRecord.user.lastName}, ${operation.room.name}`,
      appointmentType: 'Operation',
      roomName: operation.room.name,
      start: moment.unix(operation.start).format('YYYY-MM-DD HH:mm'),
      end: end.format('YYYY-MM-DD HH:mm'),
    };
  });
}

function attendancesToEvents(attendances) {
  return (
    attendances?.map(attendance => {
      const end = moment.unix(attendance.operation.start);
      end.add(1, 'hour');
      return {
        appointmentType: 'Operation attendance',
        roomName: attendance.operation.room.name,
        name: `${attendance.operation.patientMedicalRecord.user.firstName} ${attendance.operation.patientMedicalRecord.user.lastName}, ${attendance.operation.room.name}`,
        color: 'pink',
        start: moment
          .unix(attendance.operation.start)
          .format('YYYY-MM-DD HH:mm'),
        end: end.format('YYYY-MM-DD HH:mm'),
      };
    }) || []
  );
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
