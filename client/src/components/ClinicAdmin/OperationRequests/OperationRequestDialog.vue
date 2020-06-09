<template>
  <v-dialog v-model="value.showDialog" @click:outside="$emit('input', {})">
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-card-title>Operation request information</v-card-title>
          <v-card-text>
            <hr />
            <v-list>
              <v-list-item v-for="(item, index) in items" :key="index">
                <v-list-item-avatar>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-avatar>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>Room</v-list-item-title>
                  <v-row class="pa-0 ma-0">
                    <v-col cols="2" class="pa-0 ma-0">
                      <v-form ref="form" lazy-validation>
                        <v-select
                          class="pa-0 ma-0"
                          :items="getRooms"
                          item-text="name"
                          item-value="id"
                          v-model="roomId"
                          :rules="[v => !!v || `Required`]"
                        ></v-select>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="schedule" color="primary">Schedule</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <ManageOperationAttendance v-model="value.item.doctorIds" :doctorId="value.item.doctorId" />
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script>
import ManageOperationAttendance from './ManageOperationAttendance.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'OperationRequestDialog',

  components: { ManageOperationAttendance },

  props: ['value'],

  data: () => ({
    roomId: null,
  }),

  computed: {
    ...mapGetters({
      getRooms: 'rooms/getRooms',
      getUser: 'authentication/getUser',
    }),

    items() {
      const { item } = this.value;
      return [
        { icon: 'mdi-account', title: 'Doctor', subtitle: item?.doctor },
        {
          icon: 'mdi-email',
          title: 'Doctors email',
          subtitle: item?.doctorEmail,
        },
        { icon: 'mdi-account', title: 'Patient', subtitle: item?.patient },
        {
          icon: 'mdi-email',
          title: 'Patients email',
          subtitle: item?.patientEmail,
        },
        { icon: 'mdi-clock', title: 'Start', subtitle: item?.time },
      ];
    },
  },

  methods: {
    ...mapActions({
      getRoomsAction: 'rooms/getRoomsAction',
      scheduleOperation: 'operationRequests/scheduleOperation',
    }),

    schedule() {
      if (!this.$refs.form.validate()) {
        return;
      }

      const { item } = this.value;
      const operation = {
        requestId: item.id,
        operationPayload: {
          roomId: this.roomId,
          start: item.start,
          patientMedicalRecordId: item.patientMedicalRecordId,
          doctorId: item.doctorId,
          clinicId: item.clinicId,
          duration: 60,
        },
        doctorIds: item.doctorIds.map(el => el.id),
      };

      this.$emit('input', {
        showDialog: false,
        item: {
          doctorIds: [],
        },
      });
      this.scheduleOperation(operation);
    },
  },

  created() {
    this.getRoomsAction(this.getUser.clinicId);
  },
};
</script>
    
<style>
</style>