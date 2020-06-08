<template>
  <div>
    <v-card>
      <v-card-title>
        Patients in this clinic
        <v-spacer/>
        <v-text-field label="Search" v-model="search"></v-text-field>
      </v-card-title>
      <v-card-text>

      </v-card-text>
    </v-card>
    <v-data-table
    :items="patients"
    :headers="headers"
    :search="search"
    >
      <template #item.fullName="{ item }">{{item.firstName}} {{item.lastName}}</template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ViewPatientsTab",

  data: () => ({
    headers: [
      { text: "Email", value: "email" },
      { text: "Name", value: "fullName" },
      { text: "Country", value: "country" },
      { text: "City", value: "city" },
      { text: "JMBG", value: "jmbg" },
      // Hidden headers that should still be searchable
      { text: "ID", value: "id", align: " d-none" },
      { text: "Address", value: "address", align: " d-none" },
      { text: "Phone", value: "phoneNumer", align: " d-none" }
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
      patients: "patients/getPatients"
    })
  }
};
</script>

<style>
</style>