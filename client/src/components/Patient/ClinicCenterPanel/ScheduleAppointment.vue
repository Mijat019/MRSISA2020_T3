<template>
  <v-card>
    <v-card-title>
      Schedule appointment
      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-title>
      <v-select
        :items="getClinics"
        item-text="name"
        v-model="clinic"
        label="Select a clinic"
        return-object
      ></v-select>
      <v-spacer></v-spacer>
      <v-select
        v-if="clinic != null"
        :items="clinicDoctors"
        item-text="User.fullName"
        v-model="doctor"
        label="Select a doctor"
        return-object
      ></v-select>
    </v-card-title>

    <v-card-text v-if="doctor != null">
      Calendar view
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ScheduleAppointment",
  components: {
  },
  data() {
    return {
      clinic: null,
      clinicDoctors: [],
      doctor: null
    };
  },

  methods: {
    ...mapActions("doctors", {
      getDoctorsAction: "getDoctorsAction",
    }),

    ...mapActions("clinics", {
      getClinicsAction: "getClinicsAction"
    })
  },

  async mounted() {
    await this.getDoctorsAction();
    await this.getClinicsAction();
  },

  computed: {
    ...mapGetters("clinics", {
      getClinics: "getClinics"
    }),
    ...mapGetters("doctors", {
      getAllDoctors: "getDoctors"
    })
  },

  watch: {
    clinic(value) {
      this.clinicDoctors = this.getAllDoctors.filter(doc => doc.ClinicId === value.id);
      console.log(this.clinicDoctors);
    }
  }
};
</script>

<style>
</style>