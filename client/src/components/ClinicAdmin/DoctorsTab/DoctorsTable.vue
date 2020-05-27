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

    <v-card-text>
      <v-data-table :headers="headers" :items="getDoctors" :search="search">
        <template v-slot:top>
          <slot name="top"></slot>
        </template>
        <template v-slot:item.actions="{item}">
          <slot name="actions" :doctorId="item.userId" :spec="item.spec"></slot>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DoctorsTable",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "First name",
          value: "user.firstName"
        },
        {
          text: "Last name",
          value: "user.lastName"
        },
        {
          text: "City",
          value: "user.city"
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false
        }
      ]
    };
  },

  methods: {
    ...mapActions("doctors", {
      getDoctorsByClinicAction: "getDoctorsByClinicAction"
    })
  },

  async mounted() {
    await this.getDoctorsByClinicAction(this.getUser.clinicId);
  },

  computed: {
    ...mapGetters("doctors", {
      getDoctors: "getDoctors"
    }),
    ...mapGetters("authentication", {
      getUser: "getUser"
    })
  }
};
</script>

<style>
</style>