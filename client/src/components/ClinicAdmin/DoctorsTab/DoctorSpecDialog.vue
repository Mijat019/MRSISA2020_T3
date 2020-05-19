<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-icon small v-on="on">mdi-account-question</v-icon>
    </template>
    <v-card>
      <v-card-title class="headline">Doctor specializations</v-card-title>
      <v-card-text>
        <v-autocomplete
        v-model="appoTypeToAdd"
        :items="allAppoTypes"
        item-text="name"
        label="Appointment Type"
        placeholder="Enter appointment type"
        return-object
      ></v-autocomplete>
      <v-btn class="primary" @click="addSpec">Add</v-btn>
        <v-spacer/>
        <v-data-table
          :items="mySpec"
          :headers="headers"
        >
          <template v-slot:item.actions="{item}">
            <v-btn class="error" @click="removeSpec(item)">Remove</v-btn>
          </template>
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
    appoTypeToAdd: null,
    headers: [
      {
        text: "Name",
        value: "name"
      },
      {
        text: "Actions",
        value: "actions"
      }
    ]
  }),


  methods: {
    ...mapActions("snackbar", {
      showError: "showError"
    }),
    ...mapActions("appointmentTypes", {
      getAppoTypesAction: "getAppointmentTypesAction"
    }),
    ...mapActions("doctorSpec", {
      getDoctorSpecAction: "getDoctorSpecAction",
      addDoctorSpecAction: "addDoctorSpecAction",
      deleteDoctorSpecAction: "deleteDoctorSpecAction"
    }),
    addSpec: function() {
      if (this.appoTypeToAdd == null) return;
      let exists = false;
      this.mySpec.every(e => {
        if (this.appoTypeToAdd.id === e.id) {
          exists = true;
        }
      });
      if (exists == true) {
        this.showError("Specialization already added!");
        return;
      }

      this.addDoctorSpecAction({
        doctorId: this.doctorId,
        appoTypeId: this.appoTypeToAdd.id
      });
    },
    removeSpec: function(appoType) {
      this.deleteDoctorSpecAction({ 
        doctorId: this.doctorId, 
        appoTypeId: appoType.id 
      });
    }
  },

  mounted() {
    this.getAppoTypesAction();
    this.getDoctorSpecAction(this.doctorId);
  },

  computed: {
    ...mapGetters("appointmentTypes", {
      allAppoTypes: "getAppointmentTypes"
    }),
    ...mapGetters("doctorSpec", {
      mySpec: "getDoctorSpec"
    })
  }
};
</script>

<style>
</style>