<template>
  <div>
    <v-card>
      <v-card-title>
        Patients in this clinic
        <v-spacer/>
        <v-text-field label="Search" v-model="search"></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-data-table
        :items="patients"
        :headers="headers"
        :search="search"
        >
          <template #item.patient.fullName="{ item }">{{item.patient.firstName}} {{item.patient.lastName}}</template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ViewPatientsTab",

  data: () => ({
    headers: [
      { text: "Email", value: "patient.email" },
      { text: "Name", value: "patient.fullName" },
      { text: "Country", value: "patient.country" },
      { text: "City", value: "patient.city" },
      { text: "JMBG", value: "patient.jmbg" },
      // Hidden headers that should still be searchable
      { text: "ID", value: "patient.id", align: " d-none" },
      { text: "Address", value: "patient.address", align: " d-none" },
      { text: "Phone", value: "patient.phoneNumer", align: " d-none" }
    ],
    search: ""
  }),

  methods: {
    ...mapActions({
      getMyPatientsAction: "patients/getMyPatientsAction"
    })
  },

  mounted() {
    this.getMyPatientsAction();
  },

  computed: {
    ...mapGetters({
      patients: "patients/getMyPatients"
    })
  }
};
</script>

<style>
</style>