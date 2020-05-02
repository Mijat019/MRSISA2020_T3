<template>
  <v-card>
    <v-card-title>
      Doctors
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-btn dark class="mb-2" @click="showAddDialog">Add doctor</v-btn>
    <DoctorDialog></DoctorDialog>

    <v-data-table
      :headers="headers"
      :items="getDoctors"
      :search="search"
      @click:row="showEditDialog"
    >\</v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import DoctorDialog from "./DoctorDialog";
export default {
  name: "ManageDoctors",
  components: {
    DoctorDialog
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "First name",
          value: "firstName"
        },
        {
          text: "Last name",
          value: "lastName"
        },
        {
          text: "City",
          value: "city"
        }
      ]
    };
  },

  methods: {
    ...mapActions("doctors", {
      getDoctorsAction: "getDoctorsAction"
    }),

    ...mapMutations("doctors", {
      showAddDialog: "openAddDialog",
      showEditDialog: "openEditDialog"
    })
  },

  async mounted() {
    await this.getDoctorsAction();
  },

  computed: {
    ...mapGetters("doctors", {
      getDoctors: "getDoctors"
    })
  }
};
</script>

<style>
</style>