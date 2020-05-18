<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on }">
      <v-icon small v-on="on">mdi-account-question</v-icon>
    </template>
    <v-card>
      <v-card-title class="headline">Doctor specializations</v-card-title>
      <v-card-text>
        <v-autocomplete
        v-model="appoTypeToAdd"
        :items="eligibleAppoTypes"
        item-text="name"
        label="Appointment Type"
        placeholder="Enter appointment type"
        return-object
      ></v-autocomplete>
        <v-spacer/>
        <v-data-table
          :items="myAppoTypes"
        >
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DoctorSpecDialog",
  props: ["doctorId"],
  data: () => ({
    dialog: false,
    appoTypeToAdd: null
  }),


  methods: {
    ...mapActions("appointmentTypes", {
      getAppoTypesAction: "getAppointmentTypesAction"
    }),
    ...mapActions("doctorSpec", {
      getDoctorSpecAction: "getDoctorSpecAction"
    })
  },

  mounted() {
    this.getAppoTypesAction();
    this.getDoctorSpecAction(this.doctorId.doctorId);
  },

  computed: {
    ...mapGetters("appointmentTypes", {
      allAppoTypes: "getAppointmentTypes"
    }),
    ...mapGetters("doctorSpec", {
      myAppoTypes: "getDoctorSpec"
    }),
    eligibleAppoTypes: function() {
      let ret = this.allAppoTypes;
      this.myAppoTypes.forEach(myType => {
        ret = ret.filter(type => type.id != myType.id);
      });
      return ret;
    }
  }
};
</script>

<style>
</style>